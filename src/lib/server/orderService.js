import { getOrderTotals } from "@/lib/orderTotals";
import { connectToDatabase } from "@/lib/server/db";
import { requireMerchant, requireUser, ApiError } from "@/lib/server/auth";
import Order from "@/models/Order";

const roundCurrency = (value) => Math.round(value * 100) / 100;

function normalizeProducts(body) {
  if (!Array.isArray(body?.products) || body.products.length === 0) {
    throw new ApiError(400, "An order must contain at least one product.");
  }

  return body.products.map((product, index) => {
    const productId = String(product?.productId ?? "").trim();
    const name = String(product?.name ?? "").trim();
    const price = Number(product?.price);
    const quantity = Number(product?.quantity ?? 1);

    if (!productId || !name) {
      throw new ApiError(400, `Product ${index + 1} is missing its id or name.`);
    }

    if (!Number.isFinite(price) || price < 0) {
      throw new ApiError(400, `Product ${index + 1} has an invalid price.`);
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new ApiError(
        400,
        `Product ${index + 1} quantity must be a whole number from 1 to 10.`,
      );
    }

    return {
      productId,
      name,
      price: roundCurrency(price),
      quantity,
      imageUrl: product?.imageUrl ? String(product.imageUrl) : null,
    };
  });
}

export async function createOrder(request) {
  const user = await requireUser(request);
  const body = await request.json().catch(() => null);
  const products = normalizeProducts(body);
  const subtotal = roundCurrency(
    products.reduce((sum, product) => sum + product.price * product.quantity, 0),
  );
  const totals = getOrderTotals(subtotal);

  await connectToDatabase();
  const order = await Order.create({
    userId: user._id,
    products,
    subtotal,
    savings: roundCurrency(totals.savings),
    deliveryCharge: roundCurrency(totals.deliveryCharge),
    tax: roundCurrency(totals.tax),
    totalPrice: roundCurrency(totals.total),
  });

  return Response.json(
    { message: "Order created successfully.", order },
    { status: 201 },
  );
}

export async function listUserOrders(request) {
  const user = await requireUser(request);
  const orders = await Order.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return Response.json({ orders });
}

export async function listAllOrders(request) {
  await requireMerchant(request);
  await connectToDatabase();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return Response.json({ orders });
}

export async function updateOrderStatus(request, id) {
  await requireMerchant(request);
  const body = await request.json().catch(() => null);
  const allowedStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatuses.includes(body?.status)) {
    throw new ApiError(400, "The order status is invalid.");
  }

  await connectToDatabase();
  const order = await Order.findByIdAndUpdate(
    id,
    { $set: { status: body.status } },
    { returnDocument: "after", runValidators: true },
  ).lean();

  if (!order) throw new ApiError(404, "Order not found.");
  return Response.json({ order });
}

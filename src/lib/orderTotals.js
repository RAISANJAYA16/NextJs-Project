const DISCOUNT_RATE = 0.05;
const DELIVERY_CHARGE = 100;
const TAX_RATE = 0.13;

export function getOrderTotals(subtotal) {
  const savings = subtotal * DISCOUNT_RATE;
  const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;
  const tax = subtotal * TAX_RATE;

  return {
    subtotal,
    savings,
    deliveryCharge,
    tax,
    total: subtotal - savings + deliveryCharge + tax,
  };
}

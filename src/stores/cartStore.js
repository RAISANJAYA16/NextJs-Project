import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const getProductId = (product) => product._id ?? product.id;
const hasSameProductId = (product, productId) =>
  productId != null && getProductId(product) === productId;


const getTotalPrice = (products) =>
  products.reduce(
    (total, product) =>
      total + Number(product.price ?? 0) * (product.quantity ?? 1),
    0,
  );

const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        totalPrice: 0,

        addToCart: (product) =>
          set(
            (state) => {
              const productId = getProductId(product);
              const exists = state.products.some((item) =>
                hasSameProductId(item, productId),
              );
              const products = exists
                ? state.products.map((item) =>
                    hasSameProductId(item, productId)
                      ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                      : item,
                  )
                : [...state.products, { ...product, quantity: 1 }];

              return { products, totalPrice: getTotalPrice(products) };
            },
            false,
            { type: "cart/addToCart", product },
          ),
        removeFromCart: (product) => {
          const products = get().products;
          const productId = getProductId(product);
          const removedProduct = products.find((item) =>
            hasSameProductId(item, productId),
          );
          if (!removedProduct) return;

          const updatedProducts = products.filter(
            (item) => !hasSameProductId(item, productId),
          );
          set(
            { products: updatedProducts, totalPrice: getTotalPrice(updatedProducts) },
            false,
            { type: "cart/removeFromCart", product: removedProduct },
          );
        },


        //Increase Quantity
        increaseQuantity: (product) => {
          const products = get().products;
          const productId = getProductId(product);
          const currentProduct = products.find((item) =>
            hasSameProductId(item, productId),
          );

          if (!currentProduct || (currentProduct.quantity ?? 1) >= 10) return;

          const updatedProducts = products.map((item) =>
            hasSameProductId(item, productId)
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item,
          );
          set(
            { products: updatedProducts, totalPrice: getTotalPrice(updatedProducts) },
            false,
            { type: "cart/increaseQuantity", product },
          );
        },


        // Decrease Quantity
        decreaseQuantity: (product) => {
          const products = get().products;
          const productId = getProductId(product);
          const currentProduct = products.find((item) =>
            hasSameProductId(item, productId),
          );

          if (!currentProduct || (currentProduct.quantity ?? 1) <= 1) return;

          const updatedProducts = products.map((item) =>
            hasSameProductId(item, productId)
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
          set(
            { products: updatedProducts, totalPrice: getTotalPrice(updatedProducts) },
            false,
            { type: "cart/decreaseQuantity", product },
          );
        },


        //Clear Quantity
        clearCart: () => {
          set({
            products: [],
            totalPrice: 0,
          }, false, "cart/clearCart");
        },
      }),
      {
        name: "zustand:cart-storage",
        version: 3,
        migrate: (persistedState) => {
          const products = persistedState?.products ?? [];
          return { products, totalPrice: getTotalPrice(products) };
        },
        partialize: ({ products }) => ({ products }),
      },
    ),
    {
      name: "Electro Shop Cart",
    },
  ),
);

export default useCartStore;

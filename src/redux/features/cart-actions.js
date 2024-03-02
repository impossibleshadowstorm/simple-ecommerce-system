export const addToCart = (item) => ({
  type: "addItem",
  payload: item,
});

export const deleteFromCart = (itemId) => ({
  type: "deleteItem",
  payload: itemId,
});

export const checkoutCart = () => ({
  type: "checkout",
});

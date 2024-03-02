const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addItem":
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.item._id === newItem._id
      );

      if (existingItem) {
        // If item already exists in cart, update its count
        const updatedItems = state.items.map((item) =>
          item.item._id === newItem._id
            ? { ...item, count: item.count + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // If item doesn't exist in cart, add it with count 1
        return {
          ...state,
          items: [...state.items, { item: newItem, count: 1 }],
        };
      }
    case "deleteItem":
      const itemId = action.payload;
      const updatedCart = state.items
        .map((item) => {
          if (item.item._id === itemId) {
            // If item count is greater than 1, reduce its count
            if (item.count > 1) {
              return { ...item, count: item.count - 1 };
            }
            // If item count is 1, remove it from the cart
            return null;
          }
          return item;
        })
        .filter(Boolean); // Filter out null values
      return {
        ...state,
        items: updatedCart,
      };
    case "checkout":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;

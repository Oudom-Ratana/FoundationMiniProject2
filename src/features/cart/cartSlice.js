import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalPrice: 0,
  quantity: 1,
  products: []
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(`===> action: `, action.payload)
      const item = action.payload;
      const id = item.id || Date.now() + Math.random();
      const newItem = { ...item, id };
      state.products.push(newItem);
      state.totalPrice += Number(item.price || 0);
    },
    removeFromCart: (state, action) => {
      const targetId = action.payload;
      const index = state.products.findIndex((p, idx) => p.id === targetId || idx === targetId);
      if (index !== -1) {
        const itemToRemove = state.products[index];
        state.totalPrice = Math.max(0, state.totalPrice - Number(itemToRemove.price || 0));
        state.products.splice(index, 1);
      }
    }
  }
})
export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
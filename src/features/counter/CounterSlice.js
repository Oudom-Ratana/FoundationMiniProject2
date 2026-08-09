import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count : 0 //initialize value 
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    //  increment 
    increment: (state,payload) => {
      state.count +=1;
    },
    // decrement 
    decrement: (state) => {
      state.count <= 0 ? 0 : state.count -=1;
    }
  }
})

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;

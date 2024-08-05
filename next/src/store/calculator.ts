import { createSlice } from "@reduxjs/toolkit";

interface State {
  items: any;
}

const initialState: State = {
  items: JSON.parse(localStorage.getItem("details") || '[]')
};

const calculatorSlice = createSlice({
  name: 'calculatorS',
  initialState,
  reducers: {
    changeQuantity(state, action) {
      const { itemKey, quantity } = action.payload;

      const indexItem = state.items.findIndex(
        (item: any) => item._key === itemKey
      );

      if (quantity > 0) {
        // state.items[indexItem].quantity = quantity;

        console.log("here..", indexItem)
      } else {
        state.items = state.items.filter(
          (item: any) => item._key !== itemKey
        );
      }
      // localStorage.setItem("details", JSON.stringify(state.items));
    },
  }
})

export const { changeQuantity } = calculatorSlice.actions;
export default calculatorSlice.reducer;
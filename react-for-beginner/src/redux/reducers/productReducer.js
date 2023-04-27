import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productList: [],
    selectedItem: null
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // increase: (state) => {
        //     state.value += 1;
        // },
        // decrease: (state) => {
        //     state.value -= 1;
        // },
        // increaseByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
        getAllProducts: (state, action) => {
            debugger
            state.productList = action.payload.data;
        },
        getSingleProduct: (state, action) => {
            state.selectedItem = action.payload.data;
        },
    }
});

console.log('productSlice ===> ', productSlice);

// export const { getAllProducts, getSingleProduct } = productSlice.actions;
export const productActions = productSlice.actions;

export default productSlice.reducer;
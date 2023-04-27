import { productActions } from '../reducers/productReducer';
import axios from 'axios';

const getProducts = (searchQuery) => {
    return async (dispatch, getState) => {
        // let url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';
        // let response = await fetch(url);
        // let data = await response.json();
        const res = await axios.get('https://www.ag-grid.com/example-assets/olympic-winners.json');
        debugger
        dispatch(productActions.getAllProducts({data: res.data }))
    };
};

export const productAction = { getProducts };
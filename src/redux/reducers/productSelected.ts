import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { elementType } from '../../components/listOrcamento/types';

type initialStateType = {
    product:elementType | null
}
const initialState:initialStateType = {
   product:null
}

const productSelected = createSlice({
  name: 'productSelected',
  initialState,
  reducers: {
    getProduct: (state, action:PayloadAction<elementType>)=>{
        state.product = action.payload
    }
  }
});

export const {
  getProduct
} = productSelected.actions

export default productSelected.reducer
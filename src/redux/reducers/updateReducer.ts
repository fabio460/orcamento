import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { elementType } from '../../components/listOrcamento/types';

type initialStateType = {
    date:elementType[]
    list1?:elementType[]
    list2?:elementType[]
    list3?:elementType[]
}
const initialState:initialStateType = {
   date:[],
   list1:[],
   list2:[],
   list3:[]
}

const updateReducer = createSlice({
  name: "update",
  initialState,
  reducers: {
    atualiza: (state, action:PayloadAction<elementType[]>)=>{
        state.date = action.payload
    },
  }
});

export const {
    atualiza
} = updateReducer.actions

export default updateReducer.reducer
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type initialStateType = {
    checkBoxSelected:{
        id:string,
        checked:boolean
    }|{}
}
const initialState:initialStateType = {
    checkBoxSelected:{checked:true,id:""}
}

const checkBoxReducer = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    setCheckBox2:(state,action:PayloadAction<{id:string,checked:boolean}>)=>{
        state.checkBoxSelected = action.payload
    }
  }
});

export const {setCheckBox2} = checkBoxReducer.actions

export default checkBoxReducer.reducer
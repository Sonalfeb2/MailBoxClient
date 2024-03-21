import { createSlice } from "@reduxjs/toolkit";

const checkboxReducer = createSlice({
  name: "checkInboxMsg",
  initialState: {
    checked: [],
    isCheckAll : false
  },
  reducers: {
    handleChecked: (state, action) => {
      const id = action.payload.id;
      if (action.payload.checked && !state.checked.includes(id)) {
        state.checked.push({ id: id });
      }
      if (action.payload.checked === false) {
        state.checked = state.checked.filter(data => data.id !== id);
      }
    
    },
    handleCheckedAll : (state,action) =>{
        if(action.payload.checked){
            let arr =  action.payload.list.map((data)=>({id:data.id}));
            state.checked = arr
        }
        else{
            state.checked=[]
        }
        state.isCheckAll = !state.isCheckAll
    }
  }
});
export const CheckBoxReducerAction = checkboxReducer.actions;
export default checkboxReducer.reducer;

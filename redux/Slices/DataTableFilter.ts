import { createSlice } from "@reduxjs/toolkit"

type DataTableFilter={
    filterOn:boolean
}

const initialState:DataTableFilter ={
    filterOn:false
}


const datatableSlice = createSlice({
    name:"data-tablefilter",
    initialState,
    reducers:{
        toggleFilter:(state)=>{
            state.filterOn = !state.filterOn
        }
    }
})



export const {toggleFilter} = datatableSlice.actions

export const dataTableReducer = datatableSlice.reducer
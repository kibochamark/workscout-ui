import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
export interface MenuState {
  isopen: boolean
}

// Define the initial state using that type
const initialState: MenuState = {
  isopen:false
}

export const menuSlice = createSlice({
  name: 'menuslice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsOpen:(state)=>{
            state.isopen =!state.isopen
    }
  }
})

export const { setIsOpen } = menuSlice.actions


export const menuReducer = menuSlice.reducer
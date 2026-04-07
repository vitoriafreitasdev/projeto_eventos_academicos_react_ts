import { createSlice } from "@reduxjs/toolkit";
interface InicialState {
    number: number;
}

const initialState: InicialState = {
    number: 0
}
const eventSlice = createSlice({
    name: "eventSlice",
    initialState: initialState,
    reducers: {
        addNumber: (state, action) => {
            state.number += action.payload
        }
    }
})
export const {addNumber} = eventSlice.actions
export default eventSlice.reducer
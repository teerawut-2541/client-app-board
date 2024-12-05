import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface authState {
    isOpen: boolean
    message: string
}

const initialState: authState = {
    isOpen: false,
    message: "",
}

const messageErrorSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessageError: (state, action: PayloadAction<authState>) => {
            state.isOpen = action.payload.isOpen
            state.message = action.payload.message
        },
        closeMessageError: (state) => {
            state.isOpen = false
            state.message = ""
        },
    },
})

export const { setMessageError, closeMessageError } = messageErrorSlice.actions

export default messageErrorSlice.reducer

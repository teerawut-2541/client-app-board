import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface toggleMenuState {
    toggleMenu: boolean
}

const initialState: toggleMenuState = {
    toggleMenu: false,
}

const toggleMenuSlice = createSlice({
    name: "toggleMenu",
    initialState,
    reducers: {
        setToggleMenu: (state, action: PayloadAction<boolean>) => {
            state.toggleMenu = action.payload
        },
    },
})

export const { setToggleMenu } = toggleMenuSlice.actions

export default toggleMenuSlice.reducer

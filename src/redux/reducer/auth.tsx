import { AuthUser } from "@/interface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface authState {
    isLogin: boolean
    userData: AuthUser | null
}

const initialState: authState = {
    isLogin: false,
    userData: null,
}

const toggleMenuSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
        setAuthUser: (state, action: PayloadAction<AuthUser>) => {
            state.userData = action.payload
        },
        logout: (state) => {
            state.isLogin = false
            state.userData = null
        },
    },
})

export const { setAuthUser, isLogin, logout } = toggleMenuSlice.actions

export default toggleMenuSlice.reducer

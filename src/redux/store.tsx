import { configureStore } from "@reduxjs/toolkit"

import toggleMenuReducer from "./reducer/toggleMenu"
import boardItemReducer from "./reducer/boardItem"
import authReducer from "./reducer/auth"
import messageReducer from "./reducer/message"

const store = configureStore({
    reducer: {
        toggleMenu: toggleMenuReducer,
        boardItem: boardItemReducer,
        auth: authReducer,
        message: messageReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

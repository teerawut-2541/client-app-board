import { ListItemProps } from "@/interface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface BoardItemState {
    listItem: ListItemProps[]
    myBoard: ListItemProps[]
    filteredItem: ListItemProps | null
}

const initialState: BoardItemState = {
    filteredItem: null,
    listItem: [],
    myBoard: [],
}

const boardItemSlice = createSlice({
    name: "boardItem",
    initialState,
    reducers: {
        setMyBoardItem: (state, action: PayloadAction<ListItemProps[]>) => {
            state.myBoard = action.payload
        },
        setBoardItem: (state, action: PayloadAction<ListItemProps[]>) => {
            state.listItem = action.payload
        },
        boardPushItem: (state, action: PayloadAction<ListItemProps>) => {
            state.listItem.push(action.payload)
        },
        filterBoardItem: (state, action: PayloadAction<ListItemProps>) => {
            state.filteredItem = action.payload
        },
        removeItemBoard: (state, action: PayloadAction<string>) => {
            const listItemRemove = state.listItem.filter((obj) => obj.id !== action.payload)
            state.listItem = listItemRemove
        },
        clearItemBoard: (state) => {
            state.listItem = []
        },
    },
})

export const { boardPushItem, removeItemBoard, clearItemBoard, filterBoardItem, setBoardItem, setMyBoardItem } = boardItemSlice.actions

export default boardItemSlice.reducer

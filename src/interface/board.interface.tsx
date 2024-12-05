export interface Board {
    boardId: number
    title: string
    content: string
    createDate: Date
    updateDate: Date
    username: string
    boardType: string
    commentCount: number
}

export interface BoardBodyFindOne {
    boardId: number
}

export interface BoardForm {
    title: string
    content: string
    boardType: string
}
export interface MyBoardBody {
    userId: number
}

export interface BoardBodyCreate {
    title: string
    content: string
    boardType: string
    userId: number
}

export interface BoardBodyUpdate {
    title: string
    content: string
    boardType: string
    userId: number
    boardId: number
}

export interface BoardBodyRemove {
    userId: number
    boardId: number
}
export interface CommentPostBody {
    userId: number
    boardId: number
    commentText: string
}

export interface GetCommentBody {
    boardId: number
}

export interface CommentDto {
    username: string
    commentText: string
    createDate: Date
}
export interface AuthUser {
    userId: number
    username: string
}

export interface User {
    userId: number
    username: string
    token?:string
}

export interface BodyUserInquiry {
    userId?: number
    username?: string
}

export interface validateValueUsername {
    isError: boolean
    messageError: string
}


export interface RefreshTokenUser {
    token:string
}

export interface TokenRefreshResponse {
    payload: User;
    newToken: string;
}
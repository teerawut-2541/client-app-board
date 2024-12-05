export interface GatewayStatusCode {
    code: string
    message: string
}

export interface GatewayResponseData<T> {
    isError: boolean
    status: GatewayStatusCode
    data?: T | null
}

"use server"

import { GatewayResponseData, TokenRefreshResponse, User } from "@/interface"
import moment from "moment-timezone"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

const RefreshTokenApi = async (PREFIX: string): Promise<GatewayResponseData<User>> => {
    try {
        const cookieStore = await cookies()
        const secretKey = process.env.SECRET_KEY as string
        const authorizationToken = cookieStore.get("authorization")?.value

        if (!authorizationToken) {
            return generateErrorResponse("401", "Access Denied")
        }

        const data = await handleTokenRefresh(authorizationToken, secretKey, cookieStore)

        if (!data?.newToken) {
            return generateErrorResponse("401", "Invalid token")
        }

        return {
            isError: false,
            status: { "code": "200", "message": "success" },
            data: { userId: data.payload.userId, username: data.payload.username, token: data.newToken },
        }
    } catch (ex: unknown) {
        console.error(`${PREFIX} - Error: `, ex)
        return generateErrorResponse("500", "Internal Server Error", ex)
    }
}

const handleTokenRefresh = async (authorizationToken: string, secretKey: string, cookieStore: any): Promise<TokenRefreshResponse | null> => {
    try {
        const verified = jwt.verify(authorizationToken, secretKey)

        if (isUser(verified)) {
            const payload: User = { userId: verified.userId, username: verified.username }
            const newToken = jwt.sign(payload, secretKey, { expiresIn: "1h" })

            setCookie(cookieStore, newToken)
            return { payload, newToken }
        }

        return null
    } catch (error) {
        console.error("Token verification failed", error)
        return null
    }
}

const isUser = (payload: any): payload is User => {
    return payload && typeof payload.userId === "number" && typeof payload.username === "string"
}

const setCookie = (cookieStore: any, token: string) => {
    cookieStore.set({
        name: "authorization",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
    })
}

const generateErrorResponse = (code: string, message: string, error?: unknown): GatewayResponseData<any> => {
    if (error) console.error("Error details: ", error)
    return {
        isError: true,
        status: { "code": code, "message": message },
        data: null,
    }
}

export default RefreshTokenApi

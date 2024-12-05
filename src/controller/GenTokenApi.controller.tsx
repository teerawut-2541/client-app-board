"use server"

import { BodyUserInquiry, GatewayResponseData, RefreshTokenUser, User } from "@/interface"
import moment from "moment-timezone"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

const GenTokenApi = async (PREFIX: string, body: BodyUserInquiry): Promise<GatewayResponseData<RefreshTokenUser>> => {
    try {
        const cookieStore = await cookies()

        const secretKey = process.env.SECRET_KEY
        if (!secretKey) {
            return generateErrorResponse("500", "Secret key not found in environment variables")
        }

        const payload = createUserPayload(body)

        const token = generateJwtToken(payload, secretKey)

        setCookie(cookieStore, token)

        return {
            isError: false,
            status: { "code": "200", "message": "success" },
            data: {
                token,
            },
        }
    } catch (ex: unknown) {
        console.error(`${PREFIX} - Error: `, ex)
        return generateErrorResponse("500", "Internal Server Error", ex)
    }
}

const generateJwtToken = (payload: User, secretKey: string): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" })
}

const createUserPayload = (body: BodyUserInquiry): User => {
    return {
        userId: body.userId as number,
        username: body.username as string,
    }
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

export default GenTokenApi

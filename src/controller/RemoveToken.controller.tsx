"use server"

import { GatewayResponseData } from "@/interface"
import moment from "moment-timezone"
import { cookies } from "next/headers"

moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

const RemoveToken = async (PREFIX: string): Promise<GatewayResponseData<any>> => {
    try {
        const cookieStore = await cookies()
        cookieStore.delete("authorization")

        return {
            isError: false,
            status: { "code": "200", "message": "success" },
        }
    } catch (ex: unknown) {
        console.error(`${PREFIX} - Error: `, ex)
        return generateErrorResponse("500", "Internal Server Error", ex)
    }
}

export default RemoveToken

const generateErrorResponse = (code: string, message: string, error?: unknown): GatewayResponseData<any> => {
    if (error) console.error("Error details: ", error)
    return {
        isError: true,
        status: { "code": code, "message": message },
        data: null,
    }
}

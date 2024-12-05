"use server"

import { GatewayResponseData, GatewayStatusCode } from "@/interface"
import { Board, BoardBodyCreate } from "@/interface/board.interface"
import axios, { AxiosRequestConfig } from "axios"
import moment from "moment-timezone"
moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

const BoardCreateApi = async (PREFIX: string, body: BoardBodyCreate): Promise<GatewayResponseData<Board>> => {
    try {
        const responseData = await BoardCreateService(PREFIX, body)
        return {
            isError: false,
            status: responseData.status,
            data: responseData.data,
        }
    } catch (ex: unknown) {
        console.error(PREFIX, "Error: ", ex)
        const defaultStatus: GatewayStatusCode = { code: "500", message: "Internal Server Error" }

        const errorStatus = ex && typeof ex === "object" && "status" in ex ? (ex as any).status : null

        return {
            isError: true,
            status: errorStatus ? errorStatus : defaultStatus,
            data: null,
        }
    }
}

export default BoardCreateApi

const BoardCreateService = async (PREFIX: string, body: BoardBodyCreate): Promise<GatewayResponseData<Board>> => {
    try {
        const options: AxiosRequestConfig = {
            method: "POST",
            url: process.env.API_ENDPOINT_URL_BOARD_CREATE as string,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "sysDateTime": moment().format(),
                "title": body.title,
                "content": body.content,
                "boardType": body.boardType,
                "userId": body.userId,
            },
        }
        
        const response = await axios(options)
        console.log(PREFIX, " BoardCreateService response Data : ", JSON.stringify(response.data))

        return response.data
    } catch (error) {
        const defaultStatus: GatewayStatusCode = { code: "502", message: "Error fetching" }

        if (axios.isAxiosError(error)) {
            const errorResponse = error.response?.data
            console.error(PREFIX, " BoardCreateService Error response Data : ", errorResponse)

            const statusCode = errorResponse?.status?.code || "502"
            const statusMessage = errorResponse?.status?.message || "Error fetching boards"
            throw { status: { code: statusCode, message: statusMessage } }
        } else {
            console.error(PREFIX, " Unknown Error: ", error)
            throw { status: defaultStatus }
        }
    }
}

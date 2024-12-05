"use server"

import { BodyUserInquiry, GatewayResponseData, GatewayStatusCode, User } from "@/interface"
import axios, { AxiosRequestConfig } from "axios"
import moment from "moment-timezone"
moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

const UserCreateApi = async (PREFIX: string, body: BodyUserInquiry): Promise<GatewayResponseData<User>> => {
    try {
        const responseData = await UserCreateService(PREFIX, body)
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

export default UserCreateApi

const UserCreateService = async (PREFIX: string, body: BodyUserInquiry): Promise<GatewayResponseData<User>> => {
    try {
        const options: AxiosRequestConfig = {
            method: "POST",
            url: process.env.API_ENDPOINT_URL_USERS_CREATE as string,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "sysDateTime": moment().format(),
                "username": body.username ? body.username : undefined,
            },
        }

        const response = await axios(options)
        console.log(PREFIX, " UserCreateService response Data : ", JSON.stringify(response.data))

        return response.data
    } catch (error) {
        const defaultStatus: GatewayStatusCode = { code: "502", message: "Error fetching" }

        if (axios.isAxiosError(error)) {
            const errorResponse = error.response?.data
            console.error(PREFIX, " UserCreateService Error response Data : ", errorResponse)

            const statusCode = errorResponse?.status?.code || "502"
            const statusMessage = errorResponse?.status?.message || "Error fetching boards"
            throw { status: { code: statusCode, message: statusMessage } }
        } else {
            console.error(PREFIX, " Unknown Error: ", error)
            throw { status: defaultStatus }
        }
    }
}

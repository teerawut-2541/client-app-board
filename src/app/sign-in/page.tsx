"use client"

import React, { useState } from "react"

import { Button, Input } from "@nextui-org/react"
import Logo from "@/components/icon/Logo"
import { AuthUser, BodyUserInquiry, validateValueUsername } from "@/interface"
import UserInquiryApi from "@/controller/UserInquiryApi.controller"
import UserCreateApi from "@/controller/UserCreateApi.controller"
import { useDispatch } from "react-redux"
import { isLogin, setAuthUser } from "@/redux/reducer/auth"
import { useRouter } from "next/navigation"
import GenTokenApi from "@/controller/GenTokenApi.controller"
import { setMessageError } from "@/redux/reducer/message"

const SignIn = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [usernameValue, setUsernameValue] = useState<string>("")
    const [validateValueError, setValidateValueError] = useState<validateValueUsername | null>(null)

    const handleLogin = async () => {
        if (usernameValue) {
            setValidateValueError({
                isError: false,
                messageError: "",
            })
            const requestBody: BodyUserInquiry = {
                username: usernameValue,
            }
            const { isError, data, status } = await UserInquiryApi("Page Sign-in ", requestBody)
            if (isError) {
                if (status.code === "404") {
                    const resData = await UserCreateApi("Page Sign-in ", requestBody)
                    if (!resData.isError) {
                        dispatch(isLogin(true))
                        const user: AuthUser = {
                            userId: resData.data?.userId as number,
                            username: resData.data?.username as string,
                        }
                        await GenTokenApi("Page Sign-in ", user)
                        dispatch(setAuthUser(user))
                        router.push("/dashboard/home")
                    } else {
                        console.info(resData.status)
                        dispatch(setMessageError({ isOpen: resData.isError, message: resData.status.message }))
                    }
                } else {
                    console.info(status)
                    dispatch(setMessageError({ isOpen: isError, message: status.message }))
                }
            } else {
                dispatch(isLogin(true))
                const user: AuthUser = {
                    userId: data?.userId as number,
                    username: data?.username as string,
                }
                await GenTokenApi("Page Sign-in ", user)
                dispatch(setAuthUser(user))
                router.push("/dashboard/home")
            }
        } else {
            setValidateValueError({
                isError: true,
                messageError: "Please enter a valid username",
            })
        }
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#243831",
            }}>
            <div className='flex flex-col sm:grid grid-cols-3 h-full'>
                <div className='w-full h-full p-4 flex items-center justify-center basis-1/2 col-span-2 order-2 sm:order-1'>
                    <div className='w-384 sm:w-343'>
                        <h1 className='text-white text-3xl'>Sign in</h1>

                        <div className='w-full mt-4'>
                            <Input
                                type='text'
                                placeholder='Username'
                                onChange={(e) => setUsernameValue(e.target.value)}
                                isInvalid={validateValueError?.isError}
                                errorMessage={validateValueError?.messageError}
                            />
                        </div>
                        <div className='w-full mt-4'>
                            <Button color='primary' fullWidth onClick={handleLogin}>
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full basis-1/2 order-1 sm:order-2'>
                    <div
                        className='w-full h-full flex items-center justify-center  sm:rounded-l-custom rounded-b-custom'
                        style={{ backgroundColor: "#2B5F44" }}>
                        <div className='text-center'>
                            <Logo />
                            <h1 className='mt-4 text-2xl text-white'>a Board</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

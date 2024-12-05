"use client"

import React, { useEffect } from "react"
import Sidebar from "../Sidebar"
import Navbar from "../Navbar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import RefreshTokenApi from "@/controller/RefreshTokenApi.controller"
import { isLogin, logout, setAuthUser } from "@/redux/reducer/auth"
import { AuthUser } from "@/interface"
import RemoveToken from "@/controller/RemoveToken.controller"

interface LayoutsProps {
    children: React.ReactNode
}

const Layouts: React.FC<LayoutsProps> = ({ children }) => {
    const isOpen = useSelector((state: RootState) => state.toggleMenu.toggleMenu)
    const dispatch = useDispatch()
    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken = async () => {
        const { isError, data, status } = await RefreshTokenApi("RefreshTokenApi ")
        if (!isError) {
            dispatch(isLogin(true))
            const user: AuthUser = {
                userId: data?.userId as number,
                username: data?.username as string,
            }
            dispatch(setAuthUser(user))
        } else {
            console.log(status)
            await RemoveToken("logout")
            dispatch(logout())
        }
    }

    return (
        <div className='flex flex-col h-screen border-color-green-100 relative overflow-hidden'>
            <Navbar />

            <div
                className={`flex sm:hidden rounded-l-xl absolute right-0 w-72 h-screen z-50 bg-color-green-500 
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
        transition-all duration-300 ease-in-out`}>
                <Sidebar typeSidebar={true} />
            </div>

            {isOpen && <div className={`flex sm:hidden absolute right-0 w-full opacity-50 h-screen z-49 bg-black transition-all `}></div>}

            <div className='flex flex-1 overflow-hidden'>
                <div className='hidden md:block'>
                    <Sidebar typeSidebar={false} />
                </div>

                <main className='flex-1 overflow-y-auto'>{children}</main>
            </div>
        </div>
    )
}

export default Layouts

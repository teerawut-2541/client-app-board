"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Edit, Home, NarrowLeft } from "../icon"
import { Button } from "@nextui-org/react"
import { setToggleMenu } from "@/redux/reducer/toggleMenu"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"

interface SidebarProps {
    typeSidebar: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ typeSidebar }) => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.toggleMenu.toggleMenu)
    const pathname = usePathname()

    const links = [
        { href: "/dashboard/home", label: "Home", icon: <Home color={typeSidebar ? "#D8E9E4" : "#243831"} /> },
        { href: "/dashboard/our-blog", label: "Our Blog", icon: <Edit color={typeSidebar ? "#D8E9E4" : "#243831"} /> },
    ]

    const toggleMenu = () => {
        dispatch(setToggleMenu(!isOpen))
    }

    return (
        <div className='flex'>
            <div
                className={`text-white ${
                    typeSidebar ? "w-full" : "w-72"
                } space-y-4 px-2 py-2 absolute inset-y-0 left-0 transform sm:translate-x-full transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`}>
                {typeSidebar && (
                    <div className='mt-5'>
                        <Button color='primary' variant='light' startContent={<NarrowLeft />} onClick={toggleMenu} />
                    </div>
                )}
                <nav>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium text-base leading-6 flex-none order-2 block py-2.5 px-4 rounded-md hover:bg-primaryHover ${
                                pathname === link.href
                                    ? `font-black ${typeSidebar ? "text-color-green-100" : "text-color-green-500"}`
                                    : `${typeSidebar ? "text-color-green-100" : "text-color-green-500 "}`
                            }`}>
                            <span className='flex flex-row items-center'>
                                {link.icon}
                                <span className='pl-2'>{link.label}</span>
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar

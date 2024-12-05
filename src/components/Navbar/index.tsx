import React from "react"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { MenuIcon } from "../icon"
import { setToggleMenu } from "@/redux/reducer/toggleMenu"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { logout } from "@/redux/reducer/auth"
import { useRouter } from "next/navigation"
import RemoveToken from "@/controller/RemoveToken.controller"

const Navbar = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.toggleMenu.toggleMenu)
    const authState = useSelector((state: RootState) => state.auth)

    const toggleMenu = () => {
        dispatch(setToggleMenu(!isOpen))
    }

    const handleLogout = async() => {
        await RemoveToken('logout')
        dispatch(logout())
    }

    return (
        <header className='w-full bg-color-green-500 text-white px-4 py-3 shadow-md'>
            <div className='px-0 sm:px-7 mx-auto flex justify-between items-center'>
                <h1 className='text-xl font-bold'>a Board</h1>
                <nav className='hidden sm:flex'>
                    {authState.isLogin ? (
                        <div className='flex flex-row items-center'>
                            <span className='mr-4'>{authState.userData?.username}</span>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Avatar name={authState.userData?.username.slice(0, 2).toUpperCase()} size='md' style={{cursor:'pointer'}}/>
                                </DropdownTrigger>
                                <DropdownMenu aria-label='Static Actions'>
                                    <DropdownItem key='logout' onClick={handleLogout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ) : (
                        <div>
                            <Button color='primary' onClick={() => router.push("/sign-in")}>
                                Sign In
                            </Button>
                        </div>
                    )}
                </nav>
                <nav className='flex sm:hidden'>
                    <Button color='primary' variant='light' startContent={<MenuIcon />} onClick={toggleMenu} />
                </nav>
            </div>
        </header>
    )
}

export default Navbar

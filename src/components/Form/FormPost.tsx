import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import type { Selection } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { DownOutlined } from "../icon"
import { BoardBodyCreate, BoardBodyUpdate, BoardForm, ListItemProps } from "@/interface"
import BoardCreateApi from "@/controller/BoardCreateApi.controller"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import BoardEditApi from "@/controller/BoardEditApi.controller"
import { setMessageError } from "@/redux/reducer/message"

interface FormPostProps {
    onOpenChange?: () => void
    variant?: "edit" | "create"
    defaultValue?: ListItemProps | null
    onTrigger:()=> void
}

const FormPost: React.FC<FormPostProps> = ({ onOpenChange, defaultValue = null, variant = "create", onTrigger }) => {
    const dispatch = useDispatch()
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]))
    const itemMenu = ["History", "Food", "Pets", "Health", "Fashion", "Exercise", "Others"]
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({})
    const authState = useSelector((state: RootState) => state.auth)
    const [valueForm, setValueForm] = useState<BoardForm>({
        "title": "",
        "content": "",
        "boardType": "",
    })

    const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", ").replaceAll("_", " "), [selectedKeys])

    useEffect(() => {
        if (defaultValue) {
            const list: BoardForm = {
                title: defaultValue.textHeader,
                content: defaultValue.content,
                boardType: defaultValue.tag,
            }
            setSelectedKeys(new Set([defaultValue.tag]))
            setValueForm(list)
        }
    }, [defaultValue])

    const headerSubmit = async () => {
        setIsLoading(true)
        const errors = validateValue()
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted:", valueForm)
            if (variant === "edit") {
                await editBoard()
            } else {
                await createBoard()
            }
        } else {
            setErrorMessages(errors)
            setIsLoading(false)
        }
    }
    const editBoard = async () => {
        const requestBody: BoardBodyUpdate = {
            userId: authState.userData?.userId as number,
            boardId: defaultValue?.id ? parseInt(defaultValue?.id) : 0,
            ...valueForm,
        }
        const {isError, data, status} = await BoardEditApi("Board update", requestBody)
        if(!isError){
            console.log(data)
            setIsLoading(false)
            onOpenChange?.()
            onTrigger()
        } else {
            setIsLoading(false)
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

    const createBoard = async () => {
        const requestBody: BoardBodyCreate = {
            userId: authState.userData?.userId as number,
            ...valueForm,
        }
        const { isError, data, status } = await BoardCreateApi("Board Create", requestBody)
        if (!isError) {
            console.log(data)
            setIsLoading(false)
            
            onOpenChange?.()
            onTrigger()
        } else {
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

    const validateValue = () => {
        const errors: { [key: string]: string } = {}

        if (!valueForm.title) {
            errors.title = "Title is required."
        }

        if (!valueForm.content) {
            errors.content = "Content is required."
        }

        if (!valueForm.boardType) {
            errors.boardType = "Please choose a community."
        }

        return errors
    }

    const onHeaderChange = (key: string, value: string) => {
        setValueForm({
            ...valueForm,
            [key]: value,
        })
    }

    return (
        <div className='flex flex-col'>
            <div className='flex-1 mt-2 '>
                <Dropdown className='p-0 rounded-lg ' placement='bottom-start'>
                    <DropdownTrigger>
                        <Button variant='ghost' color='primary' className='capitalize w-full sm:w-[195px]'>
                            <span className='flex flex-row items-center justify-center w-full h-full'>
                                {selectedValue === "text" ? "Choose a community" : selectedValue}
                                <DownOutlined className='capitalize hover:text-white' />
                            </span>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='Single selection example'
                        className='p-0 w-[340px] sm:w-[195px]'
                        variant='flat'
                        disallowEmptySelection
                        selectionMode='single'
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}>
                        {itemMenu.map((e) => (
                            <DropdownItem
                                onClick={() => onHeaderChange("boardType", e)}
                                color='primary'
                                value={e}
                                className='m-0 rounded-lg hover:text-black hover:bg-green-100'
                                key={e}
                                textValue={e}>
                                <span className='text-black'>{e}</span>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                {errorMessages.boardType && <div className='text-red-500 text-sm mt-1'>{errorMessages.boardType}</div>}
            </div>
            <div className='flex-1 mt-3'>
                <input
                    defaultValue={valueForm.title}
                    placeholder='Title'
                    className='flex flex-col items-start py-2.5 px-3.5 w-full border-solid border-2 border-color-input rounded-lg focus:outline-none'
                    onChange={(e) => onHeaderChange("title", e.target.value)}
                />
                {errorMessages.title && <div className='text-red-500 text-sm mt-1'>{errorMessages.title}</div>}
            </div>
            <div className='flex-1 mt-5'>
                <textarea
                    defaultValue={valueForm.content}
                    className='flex flex-col items-start py-2.5 px-3.5 w-full min-h-[234px] border-solid border-2 border-color-input rounded-lg focus:outline-none'
                    placeholder='What’s on your mind...'
                    name='content'
                    onChange={(e) => onHeaderChange("content", e.target.value)}
                />
                {errorMessages.content && <div className='text-red-500 text-sm mt-1'>{errorMessages.content}</div>}
            </div>
            <div className='flex-1 flex justify-center sm:justify-end mt-4 flex-col sm:flex-row'>
                <div className='mt-2 sm:mt-0 sm:mr-4 flex-1 sm:flex-none'>
                    <Button className='border-1 w-full sm:w-28' size='md' color='primary' variant='ghost' onClick={onOpenChange}>
                        Cancel
                    </Button>
                </div>
                <div className='mt-4 sm:mt-0 flex-1 sm:flex-none'>
                    <Button size='md' color='primary' className='w-full sm:w-28' onClick={headerSubmit} isLoading={isLoading}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormPost

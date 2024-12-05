"use client"

import { Card } from "@/components/Card"
import { FormPost } from "@/components/Form"
import { List } from "@/components/List"
import { Menubar } from "@/components/Menubar"
import { Modal } from "@/components/Modal"
import BoardRemoveApi from "@/controller/BoardRemoveApi.controller"
import MyBoardAllApi from "@/controller/MyBoardApi.controller"
import { BoardBodyRemove, ListItemProps, MyBoardBody } from "@/interface"
import { filterBoardItem, setMyBoardItem } from "@/redux/reducer/boardItem"
import { setMessageError } from "@/redux/reducer/message"
import { RootState } from "@/redux/store"
import { Button, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const OurBlog = () => {
    const dispatch = useDispatch()
    const [dropdownValue, setDropdownValue] = useState<string>("")
    const [dataListItem, setDataListItem] = useState<ListItemProps[]>([])
    const [searchValue, setSearchValue] = useState<string>("")
    const [rowEdit, setRowEdit] = useState<ListItemProps | null>(null)
    const boardState = useSelector((state: RootState) => state.boardItem)
    const authState = useSelector((state: RootState) => state.auth)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [isRemove, setIsRemove] = useState(false)
    const [rowRemove, setRowRemove] = useState<ListItemProps | null>(null)
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false)
    useEffect(() => {
        if (authState.isLogin) {
            if (boardState.myBoard.length === 0) {
                fetchApiBoard()
            } else {
                setDataListItem(boardState.myBoard)
            }
        }
    }, [boardState.myBoard, authState.isLogin])

    const fetchApiBoard = async () => {
        const requestBody: MyBoardBody = {
            userId: authState.userData?.userId as number,
        }

        const { isError, data, status } = await MyBoardAllApi("Get MyBoardAllApi", requestBody)
        if (!isError) {
            const resData: ListItemProps[] =
                data?.map((obj) => ({
                    id: obj.boardId.toString(),
                    name: obj.username,
                    tag: obj.boardType,
                    textHeader: obj.title,
                    amountComment: obj.commentCount,
                    content: obj.content,
                })) || []
            dispatch(setMyBoardItem(resData))
            setDataListItem(resData)
        } else {
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

    const filterDataListItem = dataListItem.filter((obj) => {
        const searchText = searchValue?.toLowerCase()
        const dropdownFilter = dropdownValue ? obj.tag.toLowerCase() === dropdownValue.toLowerCase() : true

        if (searchText && searchText.length >= 2) {
            return obj.textHeader.toLowerCase().includes(searchText) && dropdownFilter
        }

        return dropdownFilter
    })

    const handleEdit = async (e: ListItemProps) => {
        dispatch(filterBoardItem(e))
        setRowEdit(e)
        onOpen()
    }

    const handleRemove = (e: ListItemProps) => {
        setIsRemove(!isRemove)
        setRowRemove(e)
    }

    const onClickRemove = async () => {
        setIsLoadingRemove(true)
        const requestBody: BoardBodyRemove = {
            userId: authState.userData?.userId as number,
            boardId: rowRemove?.id ? parseInt(rowRemove?.id) : 0,
        }
        const { isError, status } = await BoardRemoveApi("Board Remove Api", requestBody)
        if (!isError) {
            await fetchApiBoard()
            setIsRemove(!isRemove)
            setRowRemove(null)
            setIsLoadingRemove(false)
        } else {
            setIsLoadingRemove(false)
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

    const handleTrigger = () => {
        fetchApiBoard()
    }
    

    return (
        <div className='p-4'>
            <Menubar onTrigger={handleTrigger} onChangeValue={(e) => setSearchValue(e.target.value)} onDropdown={(e) => setDropdownValue(e)} />
            <div className='flex flex-row'>
                <div className='flex flex-row gap-2 w-full pt-4'>
                    {filterDataListItem.length !== 0 ? (
                        <Card className='w-full duration-1000 ease-in-out'>
                            <List itemList={filterDataListItem} edit={true} remove={true} onClickEdit={handleEdit} onClickRemove={handleRemove} />
                        </Card>
                    ) : null}
                </div>
                <aside className='w-64 p-4 overflow-y-auto hidden lg:block'></aside>
            </div>
            <Modal title='Edit  Post' size='2xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <FormPost onTrigger={handleTrigger} defaultValue={rowEdit} variant={"edit"} onOpenChange={onOpenChange} />
            </Modal>
            <Modal size='md' isOpen={isRemove} onOpenChange={() => setIsRemove(!isRemove)}>
                <div className='w-full text-center'>
                    <span className='font-bold'>Please confirm if you wish to </span>
                    <br />
                    <span className='font-bold'>delete the post </span>
                    <p>Are you sure you want to delete the post? Once deleted, it cannot be recovered.</p>
                    <div className='w-full mt-7 mb-4 flex flex-col sm:flex-row'>
                        <Button className='mr-2 w-full' variant='ghost' onClick={() => setIsRemove(!isRemove)}>
                            Cancel
                        </Button>
                        <Button className='bg-[#F23536] w-full mt-3 sm:mt-0' color='danger' isLoading={isLoadingRemove} onClick={onClickRemove}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default OurBlog

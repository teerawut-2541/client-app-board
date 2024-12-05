"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/Card"
import { List } from "@/components/List"
import { Menubar } from "@/components/Menubar"
import { useRouter } from "next/navigation"
import { DetailItemProps, ListItemProps } from "@/interface"
import { encodeBase64 } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import BoardAllApi from "@/controller/BoardAllApi.controller"
import { setBoardItem } from "@/redux/reducer/boardItem"
import { RootState } from "@/redux/store"
import { setMessageError } from "@/redux/reducer/message"

const Home = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [dropdownValue, setDropdownValue] = useState<string>("")
    const [dataListItem, setDataListItem] = useState<ListItemProps[]>([])
    const [searchValue, setSearchValue] = useState<string>("")
    const boardState = useSelector((state: RootState) => state.boardItem)

    useEffect(() => {
        if (boardState.listItem.length === 0) {
            fetchApiBoard()
        } else {
            setDataListItem(boardState.listItem)
        }
    }, [boardState.listItem])

    const fetchApiBoard = async () => {
        const { isError, data, status } = await BoardAllApi("Get BoardAllApi")
       
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
            dispatch(setBoardItem(resData))
            setDataListItem(resData)
        } else {
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

    const handleLinkPush = (item: ListItemProps) => {
        const payload: DetailItemProps = {
            id: item.id,
        }
        const urlBase64 = encodeBase64(JSON.stringify(payload))
        router.push(`/dashboard/details/${urlBase64}`)
    }

    const filterDataListItem = dataListItem.filter((obj) => {
        const searchText = searchValue?.toLowerCase()
        const dropdownFilter = dropdownValue ? obj.tag.toLowerCase() === dropdownValue.toLowerCase() : true

        if (searchText && searchText.length >= 2) {
            return obj.textHeader.toLowerCase().includes(searchText) && dropdownFilter
        }

        return dropdownFilter
    })

    const handleTrigger = () => {
        fetchApiBoard()
    }

    return (
        <div className='p-4'>
            <Menubar onTrigger={handleTrigger} onChangeValue={(e) => setSearchValue(e.target.value)} onDropdown={(e) => setDropdownValue(e)} />
            <div className='flex flex-row'>
                <div className='flex flex-row gap-2 w-full pt-4'>
                    {filterDataListItem.length !== 0 ? (
                        <Card className='flex-1 w-full min-h-72 transition-all duration-1000 ease-in-out'>
                            <List itemList={filterDataListItem} onClickList={handleLinkPush} />
                        </Card>
                    ) : null}
                </div>
                <aside className='w-64 p-4 overflow-y-auto hidden lg:block'></aside>
            </div>
        </div>
    )
}

export default Home

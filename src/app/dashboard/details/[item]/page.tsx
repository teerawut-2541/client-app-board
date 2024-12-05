"use client"

import React, { useState, useEffect } from "react"
import { decodeBase64 } from "@/utils"
import { CommentDto, CommentPostBody, DetailItemProps, GetCommentBody, ListItemProps } from "@/interface"
import { useDispatch, useSelector } from "react-redux"
import {  setBoardItem } from "@/redux/reducer/boardItem"
import { Button } from "@nextui-org/button"
import { ArrowLeft, Comments } from "@/components/icon"
import { Avatar, Spinner, useDisclosure } from "@nextui-org/react"
import { Tag } from "@/components/Tag"
import { InputPostComment } from "@/components/Input"
import { Modal } from "@/components/Modal"
import { ListComment } from "@/components/List"
import BoardOneApi from "@/controller/BoardOneApi.controller"
import { BoardBodyFindOne } from "@/interface/board.interface"
import { useRouter } from "next/navigation"
import moment from "moment-timezone"
import { RootState } from "@/redux/store"
import CommentPostApi from "@/controller/CommentPostApi.controller"
import GetCommentApi from "@/controller/GetCommentApi.controller"
import BoardAllApi from "@/controller/BoardAllApi.controller"
import { setMessageError } from "@/redux/reducer/message"
moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

interface DetailProps {
    params: Promise<{ item: string }>
}

const Details: React.FC<DetailProps> = ({ params }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const authState = useSelector((state: RootState) => state.auth)
    const [isPost, setIsPost] = useState(false)
    const [boardInfo, setBoardInfo] = useState<ListItemProps | null>(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [boardId, setBoardId] = useState<number>(0)
    const [rowComment, setRowComment] = useState<CommentDto[]>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fetchParams(params)
    }, [params])

    const fetchParams = async (paramsPromise: Promise<{ item: string }>) => {
        const itemString = (await paramsPromise).item
        const decodedUrlString = decodeURIComponent(itemString)
        const decodedItem = decodeBase64<DetailItemProps>(decodedUrlString)
        if (decodedItem) {
            setBoardId(parseInt(decodedItem.id))
            const requestBody: BoardBodyFindOne = {
                boardId: parseInt(decodedItem.id),
            }
            const { isError, data, status } = await BoardOneApi("Page Details ", requestBody)
            if (!isError) {
                await fetchComment(parseInt(decodedItem.id))
                setBoardInfo(
                    data
                        ? {
                              id: data.boardId.toString(),
                              key: data.boardId.toString(),
                              name: data.username,
                              tag: data.boardType,
                              textHeader: data.title,
                              content: data.content,
                              amountComment: data.commentCount,
                              createDate: formatDateRelative(data.createDate),
                          }
                        : null
                )
                
            } else {
                dispatch(setMessageError({ isOpen: isError, message: status.message }))
            }
        }
    }

    const formatDateRelative = (date: Date) => {
        return moment(date).locale("en").fromNow()
    }

    const fetchComment = async (id?: number) => {
        const requestBody: GetCommentBody = {
            boardId: id ? id : boardId,
        }
        const { isError, data } = await GetCommentApi("Page Details ", requestBody)
        if (!isError) {
            setRowComment(Array.isArray(data) ? data : [])
        }
    }

    const handlePost = async (value: string) => {
        setIsLoading(true)
        const requestBody: CommentPostBody = {
            boardId: boardId,
            userId: authState.userData?.userId as number,
            commentText: value,
        }
        const { isError, status } = await CommentPostApi("Comment Post Api", requestBody)
        if (!isError) {
            await fetchComment()
            setIsLoading(false)
            setTimeout(() => {
                setIsPost(false)
            }, 100)
            await fetchApiBoard()
        } else {
            setIsLoading(false)
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

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
           
        } else {
            dispatch(setMessageError({ isOpen: isError, message: status.message }))
        }
    }

    if (!boardInfo)
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Spinner size='lg' />
            </div>
        )

    return (
        <div className='bg-white min-h-full'>
            <div className='flex flex-row '>
                <div className='flex flex-col w-full p-4 sm:py-[36px] sm:pl-[114px] sm:pr-[216px]'>
                    <div>
                        <Button isIconOnly radius='full' size='lg' className='bg-color-green-100' onClick={() => router.back()}>
                            <ArrowLeft />
                        </Button>
                    </div>
                    <div className='flex flex-row items-center pt-10'>
                        <Avatar name={boardInfo.name.slice(0, 3).toUpperCase()} size='md' />
                        <span className='ml-2 font-bold '>{boardInfo.name}</span>
                        <span className='ml-4 text-[#939494]'>{boardInfo.createDate}</span>
                    </div>
                    <div className='mt-4 flex flex-row'>{boardInfo.tag && <Tag key={boardInfo.tag}>{boardInfo.tag}</Tag>}</div>
                    <div className='mt-4'>
                        <h1 className='text-2xl font-semibold'>{boardInfo.textHeader}</h1>
                        <p className='font-normal text-xs line-clamp-2 leading-5 mt-2'>{boardInfo.content}</p>
                    </div>
                    <div className='flex flex-row items-center mt-3'>
                        <Comments size={17} />
                        <span style={{ color: "#939494" }} className='pt-1 text-xs ml-1'>
                            {boardInfo.amountComment} Comments
                        </span>
                    </div>
                    <div className='mt-10'>
                        {!isPost ? (
                            <Button
                                size='lg'
                                color='primary'
                                className='hidden sm:flex'
                                variant='bordered'
                                onClick={() => (authState.isLogin ? setIsPost(!isPost) : router.push("/sign-in"))}>
                                Add Comments
                            </Button>
                        ) : (
                            <div className='hidden sm:flex'>
                                <InputPostComment isLoading={isLoading} onCancel={() => setIsPost(!isPost)} onPost={handlePost} />
                            </div>
                        )}

                        {!isOpen ? (
                            <Button
                                size='lg'
                                color='primary'
                                className='flex sm:hidden'
                                variant='bordered'
                                onClick={() => (authState.isLogin ? onOpen() : router.push("/sign-in"))}>
                                Add Comments
                            </Button>
                        ) : (
                            <div className='flex sm:hidden'>
                                <Modal title='Add Comments' isOpen={isOpen} onOpenChange={onOpenChange}>
                                    <InputPostComment isLoading={isLoading} onCancel={() => onOpenChange()} onPost={handlePost} />
                                </Modal>
                            </div>
                        )}
                    </div>
                    <div className='mt-5'>
                        {rowComment.map((obj, key) => {
                            return (
                                <div key={key} className='my-6'>
                                    <ListComment name={obj.username} createDate={formatDateRelative(obj.createDate)} content={obj.commentText} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details

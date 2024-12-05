import React from "react"
import { Tag } from "../Tag"
import { Comments, EditContent, Trash } from "../icon"
import { Avatar, Divider, Button } from "@nextui-org/react"
import { ListItemProps } from "@/interface"

interface ListProps {
    className?: string
    itemList: ListItemProps[]
    edit?: boolean
    remove?: boolean
    onClickList?: (item: ListItemProps) => void
    onClickEdit?: (e: ListItemProps) => void
    onClickRemove?: (e: ListItemProps) => void
}

const List: React.FC<ListProps> = ({ itemList = [], edit = false, remove = false, onClickList, onClickEdit, onClickRemove }) => {
    return (
        <div className='w-full'>
            {itemList.map((item, index) => (
                <div
                    className='mt-4 transition-all duration-200'
                    key={item.key ? item.key : index}
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickList?.(item)}>
                    <div className='flex flex-row items-center flex-wrap w-full'>
                        <div className='flex-1 flex flex-row items-center'>
                            <Avatar name={item.name.slice(0, 3).toUpperCase()} size='md' /> <span className='ml-2 font-bold'>{item.name}</span>
                        </div>
                        {edit && remove ? (
                            <div className='flex-1 flex flex-row items-center justify-end'>
                                {edit && (
                                    <span>
                                        <Button isIconOnly variant='light' onClick={() => onClickEdit?.(item)}>
                                            <EditContent />
                                        </Button>
                                    </span>
                                )}
                                {remove && (
                                    <span>
                                        <Button isIconOnly variant='light' onClick={() => onClickRemove?.(item)}>
                                            <Trash />
                                        </Button>
                                    </span>
                                )}
                            </div>
                        ) : null}
                    </div>
                    <div className='mt-4 flex flex-row'>{item.tag && <Tag key={item.tag}>{item.tag}</Tag>}</div>
                    <div className='mt-4'>
                        <h1 className='text-base font-semibold'>{item.textHeader}</h1>
                        <p className='font-normal text-xs line-clamp-2 leading-5'>{item.content}</p>
                    </div>
                    <div className='flex flex-row items-center mt-1'>
                        <Comments size={17} />{" "}
                        <span style={{ color: "#939494" }} className='pt-1 text-xs ml-1'>
                            {item.amountComment} Comments
                        </span>
                    </div>
                    {itemList.length !== index + 1 ? <Divider className='mt-6' /> : null}
                </div>
            ))}
        </div>
    )
}

export default List

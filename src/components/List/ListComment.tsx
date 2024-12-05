import { Avatar } from "@nextui-org/react"
import React from "react"

interface ListCommentProps {
    name: string
    createDate: string
    content: string
}

const ListComment: React.FC<ListCommentProps> = ({ name, createDate, content }) => {
    return (
        <div>
            <div className='flex flex-row items-center'>
                <Avatar name={name.slice(0, 2).toUpperCase()} size='md' /> <span className='ml-2 font-bold'>{name}</span> <span className='ml-4 text-[#939494]'>{createDate}</span>
            </div>
            <div className='pl-4 py-4'>
                <p className='font-normal text-xs line-clamp-2 '>{content}</p>
            </div>
        </div>
    )
}

export default ListComment

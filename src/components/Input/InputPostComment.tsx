import { Button } from "@nextui-org/button"
import React, { useState } from "react"

interface InputPostCommentProps {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    name?: string
    placeholder?: string
    rows?: number
    cols?: number
    onCancel: () => void
    onPost: (e: string) => void
    isLoading: boolean
}

const InputPostComment: React.FC<InputPostCommentProps> = ({ onCancel, onPost, rows = 4, cols = 50, isLoading }) => {
    const [value, setValue] = useState<string>("")

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }

    const handleOK = () => {
        onPost(value)
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='flex-1'>
                <textarea
                    className='flex flex-col items-start py-2.5 px-3.5 w-full border-solid border-2 border-color-input rounded-lg focus:outline-none'
                    placeholder='What’s on your mind...'
                    name=''
                    rows={rows}
                    cols={cols}
                    onChange={handleChange}
                />
            </div>
            <div className='flex-1 flex justify-center sm:justify-end mt-4 flex-col sm:flex-row'>
                <div className='mt-5 sm:mt-0 sm:mr-4 flex-1 sm:flex-none'>
                    <Button className='border-1 w-full sm:w-28' size='md' color='primary' variant='ghost' onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
                <div className='mt-4 sm:mt-0 flex-1 sm:flex-none'>
                    <Button size='md' color='primary' className='w-full sm:w-28' onClick={handleOK} isLoading={isLoading} isDisabled={!value}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InputPostComment

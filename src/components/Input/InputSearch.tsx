import React, { useState } from "react"
import { SearchIcon } from "../icon"

interface InputSearchProps {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

const InputSearch: React.FC<InputSearchProps> = ({ value, onChange, placeholder = "Search..." }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)
    return (
        <div
            className={`border-2 rounded-lg border-solid border-color-green-100 flex items-center p-1 transition-all duration-300 ease-in-out ${
                isFocused ? "w-full" : "w-9 sm:w-full"
            }`}
            style={{ height: "40px" }}>
            <div className='inline-flex w-full items-center h-full box-border'>
                <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
                <input
                    style={{ background: "none" }}
                    className='pl-1 w-full focus:outline-none  '
                    type='text'
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    )
}

export default InputSearch

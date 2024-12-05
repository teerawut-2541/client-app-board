import React from "react"

interface TagProps {
    text?: string
    children?: React.ReactNode
    color?: string
}

const Tag: React.FC<TagProps> = ({ children, text, color = "bg-blue-500" }) => {
    return (
        <span
            style={{ cursor: "pointer", color:'#4A4A4A', backgroundColor:'#F3F3F3' }}
            className={`inline-block px-3 py-1  text-sm font-semibold rounded-full ${color} hover:bg-opacity-80 transition-all duration-200`}>
            {children ? children : text}
        </span>
    )
}

export default Tag

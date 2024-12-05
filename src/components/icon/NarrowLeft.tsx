import React from "react"

interface NarrowLeftProps {
    size?: number
    color?: string
}

const NarrowLeft: React.FC<NarrowLeftProps> = ({ size = 15, color = "#D8E9E4" }) => {
    return (
        <svg width={size + 4} height={size} viewBox='0 0 19 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M1.10645 7.48804L17.1064 7.48804M17.1064 7.48804L11.1064 1.48804M17.1064 7.48804L11.1064 13.488'
                stroke={color}
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export default NarrowLeft

import React from "react"

interface ArrowLeftIconProps {
    size?: number
    color?: string
}

const ArrowLeft: React.FC<ArrowLeftIconProps> = ({ size = 25, color = "#243831" }) => {
    return (
        <svg width={size} height={size} viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M19.3398 12.4067H5.33984M5.33984 12.4067L12.3398 19.4067M5.33984 12.4067L12.3398 5.40674'
                stroke={color}
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export default ArrowLeft

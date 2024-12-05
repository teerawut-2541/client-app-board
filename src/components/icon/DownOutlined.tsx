import React from "react"

interface DownOutlinedIconProps {
    size?: number
    color?: string
    className?: string
}

const DownOutlined: React.FC<DownOutlinedIconProps> = ({ size = 21, className }) => {
    return (
        <svg className={className} width={size} height={size} viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M5.26123 7.81982L10.2612 12.8198L15.2612 7.81982'
                stroke={'currentColor'}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export default DownOutlined

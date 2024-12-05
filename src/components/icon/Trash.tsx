import React from "react"

interface TrashIconProps {
    size?: number
    color?: string
}

const Trash: React.FC<TrashIconProps> = ({ size = 17, color = "#2B5F44" }) => {
    return (
        <svg width={size} height={size} viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M10.9279 4.57536V4.04202C10.9279 3.29529 10.9279 2.92192 10.7826 2.6367C10.6547 2.38582 10.4508 2.18185 10.1999 2.05402C9.91467 1.90869 9.5413 1.90869 8.79456 1.90869H7.7279C6.98116 1.90869 6.60779 1.90869 6.32258 2.05402C6.07169 2.18185 5.86772 2.38582 5.73989 2.6367C5.59456 2.92192 5.59456 3.29529 5.59456 4.04202V4.57536M6.9279 8.24202V11.5754M9.59456 8.24202V11.5754M2.26123 4.57536H14.2612M12.9279 4.57536V12.042C12.9279 13.1621 12.9279 13.7222 12.7099 14.15C12.5182 14.5263 12.2122 14.8323 11.8359 15.024C11.4081 15.242 10.848 15.242 9.7279 15.242H6.79456C5.67446 15.242 5.11441 15.242 4.68658 15.024C4.31026 14.8323 4.0043 14.5263 3.81255 14.15C3.59456 13.7222 3.59456 13.1621 3.59456 12.042V4.57536'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export default Trash

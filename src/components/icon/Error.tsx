import React from "react"

interface ErrorIconProps {
    size?: number
    color?: string
}

const Error: React.FC<ErrorIconProps> = ({ size = 17, color = "#F23536" }) => {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z'
                stroke={color}
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path d='M12 9V13' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
            <path d='M12 17.0195V17' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    )
}

export default Error

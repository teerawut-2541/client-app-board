import React from "react"

interface CardProps {
    children: React.ReactNode
    className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`${className} flex flex-col items-start p-5 flex-none order-1 flex-grow-0 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200`}>
            {children}
        </div>
    )
}

export default Card

import React from "react"

interface SearchIconProps {
    className?: string; 
  }

const SearchIcon: React.FC<SearchIconProps> = ({className}) => {
    return (
        <svg className={className} width={21} height={21} viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M17.7612 17.8198L14.1362 14.1948M16.0946 9.48649C16.0946 13.1684 13.1098 16.1532 9.4279 16.1532C5.746 16.1532 2.76123 13.1684 2.76123 9.48649C2.76123 5.80459 5.746 2.81982 9.4279 2.81982C13.1098 2.81982 16.0946 5.80459 16.0946 9.48649Z'
                stroke='#5B5B5B'
                strokeWidth='1.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export default SearchIcon

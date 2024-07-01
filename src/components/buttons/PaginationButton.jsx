import { IconButton } from '@material-tailwind/react'
import React from 'react'

const PaginationButton = ({ handleClick, currentPage, pageNumber }) => {
    return (
        <IconButton variant={currentPage === pageNumber ? 'filled' : 'text'} color='gray' onClick={handleClick} className='text-[15px]'>{pageNumber}</IconButton>
    )
}

export default PaginationButton
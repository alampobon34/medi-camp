import { Spinner } from '@material-tailwind/react'
import React from 'react'

const Loader = ({ className }) => {
    return (
        <div className={`w-full h-full bg-white flex justify-center items-center ${className}`}>
            <Spinner className='h-10 w-10' />
        </div>
    )
}

export default Loader
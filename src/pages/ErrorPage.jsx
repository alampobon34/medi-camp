import { Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div>
            <img className='w-full h-[550px]' src='https://static.vecteezy.com/system/resources/thumbnails/008/249/822/original/a-white-robot-searching-for-a-404-error-with-a-torch-light-4k-animation-404-page-not-found-error-concept-with-a-robot-4k-footage-system-finding-404-error-with-a-big-torch-light-animated-free-video.jpg' />
            <div className='flex justify-center items-center'>
                <Link className='text-center border px-6 py-2 text-[16px] font-semibold rounded-lg mt-3 text-black/70 hover:bg-black/70 hover:text-white' to='/'>
                    <Typography variant='h6' className=''>
                        Back to home
                    </Typography>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage
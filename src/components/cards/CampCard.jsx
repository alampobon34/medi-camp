import { Button } from '@material-tailwind/react';
import React from 'react'
import { IoIosPeople } from "react-icons/io";
import { Link } from 'react-router-dom';
const CampCard = ({ camp, showBtn }) => {
    const { _id, campName, image, campFee, professional, participant, dateTime, location } = camp
    return (
        <div className='flex flex-col md:flex-row md:justify-between border rounded-md'>
            <div className='w-full md:w-[40%] relative'>
                <span className='absolute top-2.5 left-2.5 bg-white px-1.5 py-0.5 rounded-md text-[14px] font-semibold z-10'>{location}</span>
                <div className='absolute w-full h-full bg-black/20 rounded-l-md'></div>
                <img className='w-full h-full rounded-l-md' src={image} alt="img" />
            </div>
            <div className='flex-1 p-3.5'>
                <div className='text-[14px] flex flex-col md:flex-row gap-3'>
                    <div className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <p>{dateTime}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <IoIosPeople className='w-5 h-5' />
                        <span>{participant}</span>
                    </div>
                </div>
                <h1 className='mt-0.5 font-bold text-md lg:text-lg'>{campName}</h1>
                <div className='flex items-center gap-3 mt-1'>
                    {
                        campFee === 0 ? <span className='bg-green-500 px-2 py-0.5 rounded-md text-white text-[14px] mt-0.5'>FREE</span> : <>
                            <p className='text-[16px] font-medium'><span className='font-semibold'>$</span>{campFee}</p>
                            <p className='text-[16px] font-medium'><span className='font-semibold'>৳</span>{campFee * 102}</p></>
                    }
                </div>
                <p className='mt-3 text-[14px] text-black/80'>{professional}</p>
                <div className='flex justify-end'>
                    <Link to={`/camp-details/${_id}`}>
                        <Button variant='filled' size='sm'>
                            Join Camp
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CampCard
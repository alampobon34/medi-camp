import { IoLocationOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const CampSearchCard = ({ camp }) => {
    const { _id, campName, image, professional, dateTime, participant, description, location, campFee } = camp;
    return (
        <div className='flex flex-col gap-3 border-2 rounded-md p-3 bg-white'>
            <div className={`h-[150px] relative rounded`}>
                <div className='absolute inset-0 w-full h-full bg-black/40 rounded'></div>
                <img className='h-full w-full rounded' src={image} alt="" />
                <div className='absolute right-2.5 top-2.5 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-md'>
                    <IoIosPeople className='w-5 h-5' />
                    <span>{participant}</span>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <div className='flex items-center gap-1'>
                        <SlCalender className='w-4 h-4' />
                        <p className="text-[13px]">{dateTime}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <IoLocationOutline className='w-5 h-5' />
                        <p className="text-[13px]">{location}</p>
                    </div>
                </div>
                <h1 className="text-md font-semibold mt-3 truncate">{campName}</h1>
                <p className="text-[14px] text-black/90">{professional}</p>
                <div className='flex items-center gap-3 mt-1'>
                    {
                        campFee === 0 ? <span className='bg-green-500 px-2 py-0.5 rounded-md text-white text-[14px] mt-0.5'>FREE</span> : <>
                            <p className='text-[16px] font-medium'><span className='font-semibold'>$</span>{campFee}</p>
                            <p className='text-[16px] font-medium'><span className='font-semibold'>৳</span>{campFee * 102}</p></>
                    }
                </div>
                <p className="line-clamp-2 text-[14px] mt-1 text-black/80">{description}</p>

                <Link className="" to={`/camp-details/${_id}`}>
                    <Button className="w-full mt-3" variant="filled" size="sm">
                        Details
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CampSearchCard
import { FaStar } from "react-icons/fa6";
const FeedbackCard = ({ feedback }) => {
    return (
        <div className='w-full bg-white p-5 lg:p-12'>
            <div className='flex justify-center items-center'>
                <img className='w-[250px] h-[250px] border-2' src={feedback?.user?.photoURL ?? 'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg'} alt="" />
            </div>
            <div className='flex flex-col items-center justify-center uppercase text-[16px] font-semibold py-3'>
                <h1 className='w-[80%] text-center lg:w-full'>{feedback?.register?.campName}</h1>
                <div className='flex items-center gap-2'>
                    {
                        [1, 2, 3, 4, 5]?.map((ratings, index) => index < feedback?.ratings ? <FaStar className='text-yellow-500' key={index} /> : <FaStar key={index} />)
                    }
                </div>
            </div>
            <p className='text-center'>{feedback?.feedback}
            </p>
            <div className='flex flex-col items-end'>
                <p className='font-semibold'>{feedback?.participantEmail}</p>
                <p className='text-black/80'>{feedback?.register?.contactNumber}</p>
            </div>
        </div>
    )
}

export default FeedbackCard
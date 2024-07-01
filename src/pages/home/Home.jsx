import { Button } from '@material-tailwind/react'
import React from 'react'
import CarouselSlider from './CarouselSlider'
import MedicalCamps from './MedicalCamps'
import Feedbacks from './Feedbacks'
import Contact from './Contact'

const Home = () => {

    return (
        <div className=''>
            <div className='w-[98%] mx-auto'>
                <CarouselSlider />
            </div>
            <MedicalCamps />
            <Feedbacks />
            <Contact />
        </div>
    )
}

export default Home
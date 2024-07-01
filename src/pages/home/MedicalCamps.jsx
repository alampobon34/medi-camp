import React from 'react'
import SectionLayout from '../../layouts/SectionLayout'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../utils/axios'
import Loader from '../../components/shared/Loader'
import CampCard from '../../components/cards/CampCard'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
const MedicalCamps = () => {

    const { data: campList = [], isLoading: topCampLoading } = useQuery({
        queryKey: ['topCamps'],
        queryFn: async () => {
            const { data } = await api.get(`/camps/top-6`)
            return data
        },
    })

    return (
        <SectionLayout title={'Explore the upcomming camps'} paragraph={'Comprehensive Healthcare Initiatives to Support and Empower Communities Across Bangladesh'}>
            {
                topCampLoading ? <Loader /> :
                    <div data-aos="fade-up">
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                            {
                                campList && campList.length > 0 && campList.map(camp => <CampCard key={camp?._id} camp={camp} />)
                            }
                        </div >
                        <div className='mt-8 flex justify-center'>
                            <Link to={'/camps'}>
                                <Button variant='outlined' size='md'>
                                    See All Camps
                                </Button>
                            </Link>
                        </div>
                    </div>
            }
        </SectionLayout >
    )
}

export default MedicalCamps
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { api } from '../../utils/axios'
import SectionLayout from '../../layouts/SectionLayout'
import FeedbackCard from '../../components/cards/FeedbackCard'
import { Carousel, IconButton } from '@material-tailwind/react'
const Feedbacks = () => {
    const { data: feedbackList = [], isLoading: topCampLoading } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const { data } = await api.get(`/feedbacks`)
            return data
        },
    })

    console.log('f', feedbackList)
    return (
        <SectionLayout title={"See What Our Participant's Feedbacks"} paragraph={'Every participants feedback is important and valuable for us.'}>
            <Carousel
                className="rounded-xl"
                prevArrow={({ handlePrev }) => (
                    <IconButton
                        variant="outlined"
                        color="black"
                        size="md"
                        onClick={handlePrev}
                        className="!absolute top-2/4 left-4 -translate-y-2/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                    <IconButton
                        variant="outlined"
                        color="black"
                        size="md"
                        onClick={handleNext}
                        className="!absolute top-2/4 !right-4 -translate-y-2/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </IconButton>
                )}
            >
                {
                    feedbackList && feedbackList?.length > 0 && feedbackList?.map((f, index) => (
                        <FeedbackCard feedback={f} key={index} />
                    ))
                }

            </Carousel>
        </SectionLayout >
    )
}

export default Feedbacks
import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import toast from 'react-hot-toast'
import { Button, Dialog, DialogFooter, DialogHeader, Input, Option, Select } from '@material-tailwind/react'
import PaginationArrowButton from '../../../components/buttons/PaginationArrowButton'
import PaginationButton from '../../../components/buttons/PaginationButton'
import { FaCircleXmark } from 'react-icons/fa6'
import { FaCommentAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import DeleteModal from '../../../components/modals/DeleteModal'
import FeedbackModal from '../../../components/modals/FeedbackModal'
import { useForm } from 'react-hook-form'
import CheckoutModal from '../../../components/modals/CheckoutModal'

// for stripe 
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe('pk_test_51PP65pJKln1zF91dIpri6LIUj7QgHYMU6dpdnYSMnMs5Rg63gXSblCLMBhHaPKzcAnrNZBrH8zBSEWvopTUaVUyy00VUwHGUjo')
const RegisteredCamps = () => {
    const {
        reset
    } = useForm()
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(10)
    const [search, setSearch] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [paymentStatusSearch, setPaymentStatusSearch] = useState('')
    const [confirmationStatus, setConfirmationStatus] = useState('')
    const [confirmationStatusSearch, setConfirmationStatusSearch] = useState('')

    const { data: itemList = [], isLoading, refetch } = useQuery({
        queryKey: ['camp-registered-list-by-user', page, size, search, paymentStatusSearch, confirmationStatusSearch],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-registered-camps?page=${page}&size=${size}&search=${search}&paymentStatus=${paymentStatusSearch}&confirmationStatus=${confirmationStatusSearch}`)
            data?.total ? setTotal(data?.total) : setTotal(0)
            return data?.data
        },
    })

    const handleSearchSubmit = e => {
        e.preventDefault();
        const searchValue = e.target?.searchValue?.value?.trim();
        setSearch(searchValue)
        setPaymentStatusSearch(paymentStatus)
        setConfirmationStatusSearch(confirmationStatus)
    }

    const handleReset = () => {
        setSearch('')
        setPaymentStatus('')
        setPaymentStatusSearch('')

        setConfirmationStatus('')
        setConfirmationStatusSearch('')
        setPage(1)
        setSize(10)
    }

    const [id, setId] = useState()
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const handleDeleteOpen = (_id) => {
        setDeleteOpen((cur) => !cur)
        setId(_id)
    }
    const handleCancelRegister = async () => {
        const { data } = await axiosSecure.delete(`/camp-register/${id}`)
        if (data?.deletedCount) {
            toast.success('Registration Cancel successfully!')
            setDeleteOpen(false)
            refetch()
        }
        else {
            toast.error('Something went wrong!')
        }
    }


    const [feedbackOpen, setFeedbackOpen] = React.useState(false);
    const handleFeedbackOpen = (_id) => {
        setFeedbackOpen((cur) => !cur)
        setId(_id)
    }

    const handleFeedbackSubmit = async (body) => {
        const payload = {
            registerId: id,
            ...body,
            ratings: +body?.ratings
        }
        const { data } = await axiosSecure.post(`/feedback`, payload)
        if (data?.insertedId) {
            toast.success('Feedback Added Successfully!')
            setFeedbackOpen(false)
            refetch()
        }
        else {
            toast.error('Something went wrong!')
        }
    }

    const numberOfPages = Math.ceil(total / size)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)


    // for showing 
    const startIndex = (page - 1) * size + 1;
    const endIndex = Math.min(page * size, total);

    const handlePaginationButton = value => {
        setPage(value)
    }


    // for payment purpose 
    const [checkoutOpen, setCheckoutOpen] = React.useState(false);
    const [row, setRow] = useState()
    const handleCheckoutOpen = (row) => {
        setCheckoutOpen((cur) => !cur)
        setRow(row)
    }

    console.log(itemList)
    return (
        <DashboardTitleLayout title={'Registered Camps'}>
            <div>
                <form onSubmit={handleSearchSubmit} className='py-10'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <Input name="searchValue" className='' label='Enter search here..' />
                            <Select label='Payment Status' name='paymentStatus' value={paymentStatus} onChange={(value) => setPaymentStatus(value)}>
                                <Option value='Paid'>Paid</Option>
                                <Option value='Unpaid'>Unpaid</Option>
                            </Select>
                            <Select label='Confirmation Status' name='confirmationStatus' value={confirmationStatus} onChange={(value) => setConfirmationStatus(value)}>
                                <Option value='Confirmed'>Confirmed</Option>
                                <Option value='Pending'>Pending</Option>
                            </Select>
                        </div>
                        <div className='flex items-center gap-3 md:justify-end'>
                            <Button className='' onClick={handleReset} type="reset" variant='outlined' size='md'>
                                Reset
                            </Button>
                            <Button className='' type="submit" variant='gradient' size='md'>
                                Search
                            </Button>
                        </div>
                    </div>
                </form>
                <div className='w-[330px] mx-auto lg:w-auto overflow-x-auto'>
                    <table className='w-full lg:min-h-[200px]'>
                        <thead>
                            <tr className='bg-black/80 text-white'>
                                <th className='border py-2'>SL</th>
                                <th className='border py-2'>Camp Name</th>
                                <th className='border py-2'>Camp Fees</th>
                                <th className='border py-2'>Participant Name</th>
                                <th className='border py-2'>Payment Status</th>
                                <th className='border py-2'>Confirmation Status</th>
                                <th className='border py-2'>Cancel</th>
                                <th className='border py-2'>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemList && itemList?.length > 0 ? (itemList.map((d, index) =>
                                    <tr className='text-center' key={index}>
                                        <td className='border py-1'>{index + 1}</td>
                                        <td className='border py-1'>{d?.camp?.campName}</td>
                                        <td className='border py-1'>{d?.camp?.campFee ? `$${d?.camp?.campFee}` : 'FREE'}</td>
                                        <td className='border py-1'>{d?.participantName}</td>
                                        <td className='border py-1'>

                                            {d?.paymentStatus === 'Paid'
                                                ?
                                                "Paid"
                                                :
                                                <button type='button' onClick={() => handleCheckoutOpen(d)}>
                                                    <MdOutlinePayment className='w-5 h-5 text-black ' />
                                                </button>
                                            }

                                        </td>
                                        <td className='border py-1'>{d?.confirmationStatus}</td>
                                        <td className='border py-1'>
                                            <button type='button' onClick={() => {
                                                handleDeleteOpen(d?._id)
                                            }} disabled={d?.paymentStatus === 'Paid' && d?.confirmationStatus === 'Confirmed'}>
                                                <FaCircleXmark className={`w-5 h-5 ${d?.paymentStatus !== 'Paid' && d?.confirmationStatus !== 'Confirmed' ? 'text-red-600' : 'text-red-600/70'}`} />
                                            </button>
                                        </td>
                                        <td className='border py-1'>
                                            {
                                                d?.paymentStatus === 'Paid' && d?.confirmationStatus === 'Confirmed' ?
                                                    <button type='button' onClick={() => {
                                                        handleFeedbackOpen(d?._id)
                                                    }}>
                                                        <FaCommentAlt className={`w-5 h-5 text-black`} />
                                                    </button>

                                                    : 'N/A'
                                            }
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan="8" className='border text-center py-2'>No Data Found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <div>
                        <p className='py-2'>Showing {startIndex}-{endIndex} of {total}</p>
                        <div className='flex justify-end gap-2'>
                            <PaginationArrowButton direction={'left'} disabled={page === 1 ? true : false} handleClick={() => handlePaginationButton(page - 1)} />
                            {pages.map(pageNumber => (
                                <PaginationButton key={pageNumber} handleClick={() => handlePaginationButton(pageNumber)} pageNumber={pageNumber} currentPage={page} />
                            ))}
                            <PaginationArrowButton direction={'right'} disabled={page === numberOfPages ? true : false} handleClick={() => handlePaginationButton(page + 1)} />
                        </div>
                    </div>

                </div>
            </div>
            <DeleteModal open={deleteOpen} handleOpen={handleDeleteOpen} handleDelete={handleCancelRegister} />
            <FeedbackModal open={feedbackOpen} handleOpen={handleFeedbackOpen} handleOnSubmit={handleFeedbackSubmit} />
            {
                row &&
                <Elements stripe={stripePromise}>
                    <CheckoutModal open={checkoutOpen} handleOpen={handleCheckoutOpen} data={row} refetch={refetch} />
                </Elements>
            }
        </DashboardTitleLayout >
    )
}

export default RegisteredCamps
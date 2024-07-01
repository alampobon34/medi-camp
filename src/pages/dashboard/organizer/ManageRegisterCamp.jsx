import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import { FaCircleXmark } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select } from '@material-tailwind/react';
import PaginationArrowButton from '../../../components/buttons/PaginationArrowButton';
import PaginationButton from '../../../components/buttons/PaginationButton';
import toast from 'react-hot-toast';
import DeleteModal from '../../../components/modals/DeleteModal';
const ManageRegisterCamp = () => {
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
        queryKey: ['camp-registered-list', page, size, search, paymentStatusSearch, confirmationStatusSearch],
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = (_id) => {
        setOpen((cur) => !cur)
        setId(_id)
    }

    const handleCancelRegister = async () => {
        const { data } = await axiosSecure.delete(`/camp-register/${id}`)
        if (data?.deletedCount) {
            toast.success('Item deleted successfully!')
            setOpen(false)
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

    return (
        <DashboardTitleLayout title={' Manage Registered Camps'}>
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
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-black/80 text-white'>
                                <th className='border py-2'>SL</th>
                                <th className='border py-2'>Participant Name</th>
                                <th className='border py-2'>Camp Name</th>
                                <th className='border py-2'>Camp Fees</th>
                                <th className='border py-2'>Payment Status</th>
                                <th className='border py-2'>Confirmation Status</th>
                                <th className='border py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemList && itemList?.length > 0 ? (itemList.map((d, index) =>
                                    <tr className='text-center' key={index}>
                                        <td className='border py-1'>{index + 1}</td>
                                        <td className='border py-1'>{d?.participantName}</td>
                                        <td className='border py-1'>{d?.campName}</td>
                                        <td className='border py-1'>{d?.campFee ? `$${d?.campFee}` : 'FREE'}</td>
                                        <td className='border py-1'>{d?.paymentStatus}</td>
                                        <td className='border py-1'>{d?.confirmationStatus}</td>
                                        <td className='border py-1 flex items-center justify-center gap-2 h-max'>
                                            <button type='button' onClick={() => {
                                                handleOpen(d?._id)
                                            }} disabled={d?.paymentStatus === 'Paid' && d?.confirmationStatus === 'Confirmed'}>
                                                {
                                                    d?.paymentStatus === 'Paid' && d?.confirmationStatus === 'Confirmed' ?

                                                        <FaCircleCheck className='w-5 h-5 text text-green-600' />
                                                        :
                                                        <FaCircleXmark className='w-5 h-5 text-red-600' />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan="6" className='border text-center py-2'>No Data Found</td>
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
            <DeleteModal open={open} handleOpen={handleOpen} handleDelete={handleCancelRegister} />
        </DashboardTitleLayout >
    )
}

export default ManageRegisterCamp
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import PaginationArrowButton from '../../../components/buttons/PaginationArrowButton'
import PaginationButton from '../../../components/buttons/PaginationButton'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(10)
    const [search, setSearch] = useState('')
    const {
        reset
    } = useForm()

    const { data: paymentList = [], isLoading, refetch } = useQuery({
        queryKey: ['payments', page, size, search],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments?page=${page}&size=${size}&search=${search}`)
            data?.total ? setTotal(data?.total) : setTotal(0)
            return data?.data
        },
    })

    const handleSearchSubmit = e => {
        e.preventDefault();
        const searchValue = e.target?.searchValue?.value?.trim();
        setSearch(searchValue)
    }

    const handleReset = () => {
        setSearch('')
        setPage(1)
        setSize(10)
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
        <DashboardTitleLayout title={'Payment History'}>
            <div>
                <form onSubmit={handleSearchSubmit} className='py-10'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <Input name="searchValue" className='' label='Enter search here..' />

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
                                <th className='border py-2'>Transaction ID</th>
                                <th className='border py-2'>Transaction Date</th>
                                <th className='border py-2'>Payment Status</th>
                                <th className='border py-2'>Confirmation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paymentList && paymentList?.length > 0 ? (paymentList.map((d, index) =>
                                    <tr className='text-center' key={index}>
                                        <td className='border py-1'>{index + 1}</td>
                                        <td className='border py-1'>{d?.campName}</td>
                                        <td className='border py-1'>{d?.register?.campFee ? `$${d?.register?.campFee}` : 'FREE'}</td>
                                        <td className='border py-1'>{d?.transactionId}</td>
                                        <td className='border py-1'>{d?.date ? new Date(d?.date)?.toISOString()?.split('T')[0] : ''}</td>
                                        <td className='border py-1'>{d?.register?.paymentStatus}</td>
                                        <td className='border py-1'>{d?.register?.confirmationStatus}</td>
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
        </DashboardTitleLayout >
    )
}

export default PaymentHistory
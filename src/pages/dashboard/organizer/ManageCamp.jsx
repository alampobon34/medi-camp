import React, { useState } from 'react'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import { api } from '../../../utils/axios'
import { useQuery } from '@tanstack/react-query'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import PaginationArrowButton from '../../../components/buttons/PaginationArrowButton'
import PaginationButton from '../../../components/buttons/PaginationButton'
const ManageCamp = () => {
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(10)
    const [search, setSearch] = useState('')
    const [deleteItem, setDeleteItem] = useState(null)

    const { data: itemList = [], isLoading, refetch } = useQuery({
        queryKey: ['camp-list', page, size, search],
        queryFn: async () => {
            const { data } = await api.get(`/all-camps?page=${page}&size=${size}&search=${search}`)
            data?.total ? setTotal(data?.total) : setTotal(0)
            return data?.data
        },
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen((cur) => !cur)
    }

    const handleDelete = (_id) => {
        setDeleteItem(_id)
        setOpen((cur) => !cur)
    }

    const deleteSubmit = async () => {
        const { data } = await axiosSecure.delete(`/delete-camp/${deleteItem}`)
        if (data?.deletedCount) {
            toast.success('Item deleted successfully!')
            setOpen(false)
            refetch()

        }
        else {
            toast.error('Something went wrong!')
        }
    }




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
        <DashboardTitleLayout title={' Manage Camps'}>
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
            <div>
                <h1 className='text-center py-2 font-semibold text-2xl'>Camp List Data</h1>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-black/80 text-white'>
                                <th className='border py-2'>SL</th>
                                <th className='border py-2'>Camp Name</th>
                                <th className='border py-2'>Date & Time</th>
                                <th className='border py-2'>Location</th>
                                <th className='border py-2'>Professional</th>
                                <th className='border py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemList && itemList?.length > 0 ? (itemList.map((d, index) =>
                                    <tr className='text-center' key={index}>
                                        <td className='border py-1'>{index + 1}</td>
                                        <td className='border py-1'>{d?.campName}</td>
                                        <td className='border py-1'>{d?.dateTime}</td>
                                        <td className='border py-1'>{d?.location}</td>
                                        <td className='border py-1'>{d?.professional}</td>
                                        <td className='border py-1 flex items-center justify-center'>
                                            <Link className='mr-2' to={`/dashboard/update-camp/${d?._id}`}>
                                                <FaRegEdit className='w-5 h-5' />
                                            </Link>
                                            <button type='button' onClick={() => handleDelete(d?._id)}>
                                                <FaRegTrashAlt className='w-5 h-5' />
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

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Delete Confirmation</DialogHeader>
                <DialogBody>
                    Do you want to delete?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="black" onClick={deleteSubmit}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </DashboardTitleLayout >
    )
}

export default ManageCamp
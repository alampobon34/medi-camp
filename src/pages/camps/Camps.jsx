import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { api } from "../../utils/axios"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import SearchCardLayout from "../../layouts/SearchCardLayout"
import Loader from "../../components/shared/Loader"
import { LuLayoutTemplate } from "react-icons/lu";
import CampSearchCard from "../../components/cards/CampSearchCard"
import PaginationArrowButton from "../../components/buttons/PaginationArrowButton"
import PaginationButton from "../../components/buttons/PaginationButton"
const Camps = () => {
    const [toggleLayout, setToggleLayout] = useState(false);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [size, setSize] = useState(6)
    const [search, setSearch] = useState('')
    const [sortValue, setSortValue] = useState('')

    const { data: campList = [], isLoading } = useQuery({
        queryKey: ['camp-filter-list', search, sortValue, page, size],
        queryFn: async () => {
            const { data } = await api.get(`/all-camps?page=${page}&size=${size}&search=${search}&${sortValue}`)
            data?.total ? setTotal(data?.total) : setTotal(0)
            return data?.data
        },
    })

    const handleSearchSubmit = e => {
        e.preventDefault();
        const searchValue = e.target?.searchValue?.value?.trim();
        if (searchValue && searchValue?.length > 0) {
            setSearch(searchValue)
        }
    }
    const handleSort = (value) => {
        setSortValue(value)
    }

    const handleReset = () => {
        setSortValue('')
        setSearch('')
    }

    // console.log(campList)

    const numberOfPages = Math.ceil(total / size)
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)


    // for showing 

    const startIndex = (page - 1) * size + 1;
    const endIndex = Math.min(page * size, total);

    const handlePaginationButton = value => {
        setPage(value)
    }

    return (
        <section className="wrapper section">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-[25%] border flex flex-col gap-4">
                    <SearchCardLayout title={'Camp Name'}>
                        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
                            <Input type="text" label="Enter your search value" name="searchValue" className="w-full" />
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" size="md">
                                    Seach
                                </Button>
                                <Button onClick={handleReset} variant="outlined" type="button" className="w-full" size="md">
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </SearchCardLayout>

                    <SearchCardLayout title={'Filter by value'}>
                        <Select onChange={handleSort} label="Select" variant="outlined" className="w-full" value={sortValue}>
                            <Option value="participantSort=desc">Most Registered</Option>
                            <Option value="campFeeSort=asc">Camp Fee (Low-High)</Option>
                            <Option value="campFeeSort=desc">Camp Fee (High-Low)</Option>
                            <Option value="campNameSort=asc">Camp Name (A-Z)</Option>
                            <Option value="campNameSort=desc">Camp Name (Z-A)</Option>
                        </Select>
                    </SearchCardLayout>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="min-h-12 bg-white flex justify-end items-center gap-3 rounded-lg py-1.5 px-3">
                        <button type="button" className="group p-1 border-2 border-white rounded-md" onClick={(e) => setToggleLayout(!toggleLayout)}>
                            <LuLayoutTemplate className={`w-6 h-6 group-hover:text-black/80 block ${toggleLayout ? 'text-black/90' : 'text-black/60'}`} />
                        </button>
                    </div>
                    {
                        isLoading ?
                            <Loader />
                            :
                            campList && campList?.length > 0 ? <div className={`grid grid-cols-1 md:grid-cols-2 ${toggleLayout ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-3`}>
                                {campList && campList.map((camp, index) => <CampSearchCard key={index} camp={camp} />)}
                            </div>
                                :
                                < div className="h-full w-full mx-auto" >
                                    <img className="w-full h-full" src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg" alt="" />
                                </div >

                    }

                </div>
            </div>
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
        </section>
    )
}

export default Camps



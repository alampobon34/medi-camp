
const SearchCardLayout = ({ children, title }) => {
    return (
        <div className='bg-white rounded-lg'>
            <div className='border-b min-h-12 flex justify-start items-center px-4'>
                <h1 className="font-medium">{title}</h1>
            </div>
            <div className='mt-5 px-4 pb-4'>
                {children}
            </div>
        </div>
    )
}

export default SearchCardLayout
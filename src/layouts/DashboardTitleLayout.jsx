import React from 'react'

const DashboardTitleLayout = ({ children, title, rightSide }) => {
    return (
        <section className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl'>{title}</h1>
                {rightSide}
            </div>
            <div>
                {children}
            </div>
        </section>
    )
}

export default DashboardTitleLayout
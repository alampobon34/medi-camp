import React from 'react'

const SectionLayout = ({ children, title, paragraph }) => {
    return (
        <section className='wrapper section flex flex-col gap-4 md:gap-6 lg:gap-8'>
            <div className='text-center'>
                <h1 className='text-2xl font-bold md:text-3xl lg:text-4xl'>{title}</h1>
                <p className='mt-2 text-black/70 text-[14px] md:text-[16px] lg:text-[18px]'>{paragraph}</p>
            </div>
            {children}
        </section>
    )
}

export default SectionLayout
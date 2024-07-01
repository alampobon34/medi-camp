import React from 'react'
import ErrorMessage from '../components/shared/ErrorMessage'

const FormGroupLayout = ({ children, errorMessage }) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
            {children}
            {
                errorMessage && <ErrorMessage message={errorMessage} />
            }
        </div>
    )
}

export default FormGroupLayout
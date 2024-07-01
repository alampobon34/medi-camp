import React, { useEffect, useState } from 'react'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import FormLayout from '../../../layouts/FormLayout'
import FormGroupLayout from '../../../layouts/FormGroupLayout'
import { Button, Input, Spinner, Textarea } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { uploadImage } from '../../../utils/service'
import Loader from '../../../components/shared/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../utils/axios'

const CampForm = ({ isUpdate }) => {
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        setValue,
        formState: { errors },
    } = useForm()


    const { id } = useParams()
    if (isUpdate) {
        const { data: item = {} } = useQuery({
            queryKey: ['camp-item', id],
            queryFn: async () => {
                const { data } = await api.get(`/camp-details/${id}`)
                return data
            },
        })
        setValue('campName', item?.campName)
        setValue('campFee', item?.campFee)
        setValue('dateTime', item?.dateTime)
        setValue('location', item?.location)
        setValue('professional', item?.professional)
        setValue('description', item?.description)
        setValue('participant', item?.participant)
        // setValue('imageUrl', item?.image)
    }


    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async payload => {
            const { data } = isUpdate ? await axiosSecure.put(`/camp/${id}`, payload) : await axiosSecure.post(`/camp`, payload)
            return data
        },
        onSuccess: () => {
            toast.success(isUpdate ? 'Camp Updated Successfully!' : 'Camp Added Successfully!')
            setLoading(false)
            reset();
            navigate('/dashboard/manage-camps')
        },
        onError: async (error) => {
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true)
        const image_url = await uploadImage(data?.image[0]);
        // console.log(image_url);
        if (image_url) {
            let payload = {};
            if (isUpdate) {
                payload = {
                    ...data,
                    participant: +data?.participant,
                    campFee: +data?.campFee,
                    image: image_url
                }
            } else {
                payload = {
                    ...data,
                    participant: +0,
                    campFee: +data?.campFee,
                    image: image_url
                }
            }
            await mutateAsync(payload);
        }
        else {
            toast.error('Something Went Wrong!')
        }
    }

    return (
        <DashboardTitleLayout title={isUpdate ? 'Update Camp' : 'Add Camp'}>
            <div className='w-full lg:w-[50%] mx-auto'>
                <h1 className='my-4 font-semibold text-xl lg:text-3xl text-center text-black/80'>Enter the Camp Information</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <input type='hidden' value={0}  {...register("participant")} /> */}
                    <FormLayout>
                        <FormGroupLayout errorMessage={errors.campName?.message}>
                            <Input label='Camp Name' type='text'
                                {...register("campName", { required: 'Camp Name is required!' })}
                                error={errors?.campName?.message ? true : undefined} />
                        </FormGroupLayout>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <FormGroupLayout errorMessage={errors.campFee?.message}>
                                <Input label='Camp Fee ($)' type='number'
                                    {...register("campFee", {
                                        required: 'Camp Fee is required!',
                                        min: { value: 0, message: 'Min Value 0' }
                                    })}
                                    error={errors?.campFee?.message ? true : undefined}
                                />
                            </FormGroupLayout>
                            <FormGroupLayout errorMessage={errors.dateTime?.message}>
                                <Input label='Date & Time' type='datetime-local'
                                    {...register("dateTime", {
                                        required: 'Date & Time is required!',
                                    })}
                                    error={errors?.dateTime?.message ? true : undefined}
                                />
                            </FormGroupLayout>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <FormGroupLayout errorMessage={errors.location?.message}>
                                <Input label='Location' type='text'
                                    {...register("location", {
                                        required: 'Location is required!',
                                    })}
                                    error={errors?.location?.message ? true : undefined} />
                            </FormGroupLayout>
                            <FormGroupLayout errorMessage={errors.professional?.message}>
                                <Input label='Healthcare Professional' type='text'
                                    {...register("professional", {
                                        required: 'Healthcare Professional is required!',
                                    })}
                                    error={errors?.professional?.message ? true : undefined} />
                            </FormGroupLayout>
                        </div>
                        <FormGroupLayout errorMessage={errors.description?.message}>
                            <Textarea label='description'
                                {...register("description", {
                                    required: 'Description is required!',
                                })}
                                error={errors?.description?.message ? true : undefined} />
                        </FormGroupLayout>
                        <div className='flex flex-col lg:flex-row gap-3'>
                            <FormGroupLayout errorMessage={errors.image?.message}>
                                <Input label='Image' type='file'
                                    {...register("image", {
                                        required: 'Image is required!',
                                    })}
                                    error={errors?.image?.message ? true : undefined} />
                            </FormGroupLayout>
                        </div>
                        <FormGroupLayout>
                            <Button className='flex justify-center items-center' type='submit' disabled={loading || isLoading}>
                                {loading || isLoading ? <Spinner className="h-4 w-4" /> : isUpdate ? 'UPDATE' : "SUBMIT"}
                            </Button>
                        </FormGroupLayout>
                    </FormLayout>
                </form>
            </div>
        </DashboardTitleLayout>
    )
}

export default CampForm
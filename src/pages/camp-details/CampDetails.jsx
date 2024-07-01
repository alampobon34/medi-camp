import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/axios';
import Loader from '../../components/shared/Loader';
import { IoIosPeople } from 'react-icons/io';
import { FaLocationDot } from "react-icons/fa6";
import { Button, Card, CardBody, CardFooter, Checkbox, Dialog, Input, Option, Select, Spinner, Typography } from '@material-tailwind/react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import FormGroupLayout from '../../layouts/FormGroupLayout';
import FormLayout from '../../layouts/FormLayout';
import { useForm, Controller } from 'react-hook-form';
import { axiosSecure } from '../../hooks/useAxiosSecure';
const CampDetails = () => {
    const { user, loading, logOut } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate()
    const location = useLocation();

    const { data: camp = {}, isLoading, refetch } = useQuery({
        queryKey: ['camp', id],
        queryFn: async () => {
            const { data } = await api.get(`/camp-details/${id}`)
            return data
        },
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if (user && user?.email) {
            setOpen((cur) => !cur)
        } else {
            console.log(location)
            toast.error('Please Login first!');
            navigate('/login', { state: location.pathname, replace: true })
        }
    }

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const { mutateAsync, isLoading: mutationLoading } = useMutation({
        mutationFn: async payload => {
            const { data } = await axiosSecure.post(`/camp-register`, payload)
            return data
        },
        onSuccess: () => {
            console.log('Data Saved Successfully')
            toast.success('Camp Registered Successfully!')
            reset();
            setOpen(false);
            refetch()
            navigate('/dashboard/registered-camps')
        },
        onError: async (error) => {
            toast.error(error?.response?.data?.message)
            reset();
            setOpen(false);
        }
    })

    const onSubmit = async data => {
        const campRegister = {
            campId: camp?._id,
            campName: camp?.campName,
            campFee: camp?.campFee,
            location: camp?.location,
            professional: camp?.professional,
            participantName: user?.displayName,
            participantEmail: user?.email,
            paymentStatus: 'Unpaid',
            confirmationStatus: 'Pending',
            age: +data?.age,
            gender: data?.gender,
            contactNumber: data?.contactNumber,
            emergencyContact: data?.emergencyContact
        }
        await mutateAsync(campRegister);
    }

    return (
        <section className='wrapper py-5'>
            {
                isLoading || loading || mutationLoading ? <Loader className={'fixed inset-0'} /> : (
                    <div className='flex flex-col gap-4'>
                        <div className='w-full h-[250px] md:h-[550px] rounded-lg'>
                            <img className='h-full w-full rounded-lg' src={camp?.image} alt="img" />
                        </div>
                        <div className='py-2'>
                            <div className='text-[14px] md:text-[18px] flex flex-wrap md:flex-row gap-4 md:gap-5'>
                                <div className='flex items-center gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 md:size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    <p>{camp?.dateTime}</p>
                                </div>

                                <div className='flex items-center gap-1'>
                                    <FaLocationDot className='w-5 h-5 md:w-8 md:h-8' />
                                    <span>{camp?.location}</span>
                                </div>
                            </div>
                            <h1 className='my-2 md:mt-3 text-lg md:text-2xl font-semibold'>{camp?.campName}</h1>
                            <p className='text-[14px] text-black/80'>{camp?.professional}</p>
                            <div className='flex items-center gap-4 mt-3'>
                                <div className='flex items-center gap-1'>
                                    <IoIosPeople className='w-5 h-5 md:w-8 md:h-8' />
                                    <span>{camp?.participant}</span>
                                </div>
                                <div className='flex items-center gap-3 mt-1'>
                                    {
                                        camp?.campFee === 0 ? <span className='bg-green-500 px-2 py-0.5 rounded-md text-white text-[14px] mt-0.5'>FREE</span> : <>
                                            <p className='text-[16px] font-medium'><span className='font-semibold'>$</span>{camp?.campFee}</p>
                                            <p className='text-[16px] font-medium'><span className='font-semibold'>৳</span>{camp?.campFee * 102}</p></>
                                    }
                                </div>
                            </div>
                            <Typography className='mt-3'>
                                {camp?.description}
                            </Typography>
                            <Button onClick={handleOpen} className='mt-3' size='md' variant='gradient'>
                                Join Camp
                            </Button>
                        </div>
                    </div>
                )
            }

            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="mx-auto w-full h-[350px] md:h-auto overflow-auto">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Join Our Camp
                            </Typography>
                            <FormLayout>
                                <div className='flex items-center flex-col md:flex-row gap-3'>
                                    <FormGroupLayout>
                                        <Typography className="mb-1" variant="h6" >
                                            Camp Name
                                        </Typography>
                                        <Input label="Camp Name" size="md" value={camp?.campName} disabled />
                                    </FormGroupLayout>
                                    <FormGroupLayout>
                                        <Typography className="mb-1" variant="h6">
                                            Camp Fee
                                        </Typography>
                                        <Input label="Camp fee" size="md" value={camp?.campFee} disabled />
                                    </FormGroupLayout>
                                    <FormGroupLayout>
                                        <Typography className="mb-1" variant="h6">
                                            Location
                                        </Typography>
                                        <Input label="location" size="md" value={camp?.location} disabled />
                                    </FormGroupLayout>
                                </div>
                                <div>
                                    <FormGroupLayout>
                                        <Typography className="mb-1" variant="h6">
                                            Healthcare Professional
                                        </Typography>
                                        <Input label="" size="md" value={camp?.professional} disabled />
                                    </FormGroupLayout>
                                </div>
                                <div className='flex items-center flex-col md:flex-row gap-3'>
                                    <FormGroupLayout>
                                        <Typography className="mb-1" variant="h6">
                                            Participant Name
                                        </Typography>
                                        <Input label="" size="md" value={user?.displayName} disabled />
                                    </FormGroupLayout>
                                    <FormGroupLayout>
                                        <Typography className="mb-1" variant="h6">
                                            Participant Email
                                        </Typography>
                                        <Input label="" size="md" value={user?.email} disabled />
                                    </FormGroupLayout>
                                </div>

                                {/* user input part  */}
                                <div className='flex items-center flex-col md:flex-row gap-3'>
                                    <FormGroupLayout errorMessage={errors?.age?.message}>
                                        <Typography className="mb-1" variant="h6">
                                            Age
                                        </Typography>
                                        <Input label="Enter Your Age" size="md" type='number'
                                            {...register("age", {
                                                required: 'Age is required!',
                                                min: { value: 0, message: "Age cann't be a negative number!" }
                                            })}
                                            error={errors?.age?.message ? true : undefined}
                                        />
                                    </FormGroupLayout>
                                    <FormGroupLayout errorMessage={errors?.gender?.message}>
                                        <Typography className="mb-1" variant="h6">
                                            Gender
                                        </Typography>
                                        <Controller
                                            name='gender'
                                            control={control}
                                            rules={{ required: 'Gender is required!' }}
                                            render={({ field }) => <Select label="Select Your Gender" onChange={field.onChange} error={errors?.gender?.message ? true : undefined}>
                                                <Option value='Male'>Male</Option>
                                                <Option value='Female'>Female</Option>
                                            </Select>
                                            }

                                        />
                                    </FormGroupLayout>
                                </div>
                                <div className='flex items-center flex-col md:flex-row gap-3'>
                                    <FormGroupLayout errorMessage={errors?.contactNumber?.message}>
                                        <Typography className="mb-1" variant="h6">
                                            Contact Number
                                        </Typography>
                                        <Input label="Contact Number" size="md" type='tel'
                                            {...register("contactNumber", {
                                                required: 'Contact Number is required!',
                                                validate: (value) => {
                                                    if (value?.length !== 11 || isNaN(value)) {
                                                        return "Enter valid phone number!"
                                                    }
                                                }
                                            })}
                                            error={errors?.contactNumber?.message ? true : undefined} />
                                    </FormGroupLayout>
                                    <FormGroupLayout errorMessage={errors?.emergencyContact?.message}>
                                        <Typography className="mb-1" variant="h6">
                                            Emergency Contact
                                        </Typography>
                                        <Input label="Emergency Contact" size="md" type='tel'
                                            {...register("emergencyContact", {
                                                required: 'Emergency Contact is required!',
                                                validate: (value) => {
                                                    if (value?.length !== 11 || isNaN(value)) {
                                                        return "Enter valid phone number!"
                                                    }
                                                }
                                            })}
                                            error={errors?.emergencyContact?.message ? true : undefined} />
                                    </FormGroupLayout>
                                </div>
                            </FormLayout>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" type='submit' disabled={mutationLoading} >
                                {mutationLoading ? <Spinner className="h-4 w-4" /> : "Submit"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </section>
    )
}

export default CampDetails



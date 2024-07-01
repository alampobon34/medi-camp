import React, { useEffect, useState } from 'react'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import { Button, Input } from '@material-tailwind/react'
import useAuth from '../../../hooks/useAuth'
import FormLayout from '../../../layouts/FormLayout'
import FormGroupLayout from '../../../layouts/FormGroupLayout'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { uploadImage } from '../../../utils/service'

const Profile = () => {
    const [isdisable, setIsDisable] = useState(true)
    const { user, loading, updateUser, setLoading } = useAuth()
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm()

    if (loading) return <Loader />

    const handleclick = () => {
        setIsDisable(!isdisable)
    }

    const RightSide = () => {
        return (
            <Button size='md' variant='gradient' onClick={handleclick}>
                Update Profile
            </Button>
        )
    }

    useEffect(() => {
        if (user) {
            setValue('name', user?.displayName)
        }
    }, [user])

    const onSubmit = async (data) => {
        console.log(data)
        const { name, image } = data;
        let image_url = user?.photoURL;
        setLoading(true);
        if (image) {
            image_url = await uploadImage(image[0]);
        }
        updateUser(name, image_url)
            .then(result => {
                console.log(result)
                toast.success('Register Successfully!');
            })
            .catch(error => {
                console.log('error', error)
            }).finally(res => setLoading(false))
    }

    return (
        <DashboardTitleLayout title={'Update Profile'} rightSide={<RightSide />}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full md:w-[60%] mx-auto'>
                    <FormLayout>
                        <FormGroupLayout>
                            <div className='flex justify-center items-center'>
                                <img className='w-[200px] lg:w-[250px] h-[250px] lg:h-[200px]' src={user?.photoURL ?? 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} alt="" />
                            </div>
                        </FormGroupLayout>
                        <FormGroupLayout errorMessage={errors.displayImage?.message}>
                            <Input type='text' label='Name' disabled={isdisable}  {...register("name", { required: 'Name is required!' })} error={errors.name?.message ? true : undefined} />
                        </FormGroupLayout>
                        <FormGroupLayout>
                            <Input label='Image' type='file' disabled={isdisable} {...register("image", { required: false })} />
                        </FormGroupLayout>
                        <FormGroupLayout>
                            <Button type='submit' disabled={isdisable}>
                                Update Profile
                            </Button>
                        </FormGroupLayout>
                    </FormLayout>
                </div>
            </form>
        </DashboardTitleLayout>
    )
}

export default Profile
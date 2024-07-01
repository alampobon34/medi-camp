import { Button, Spinner, Typography } from '@material-tailwind/react'
import React from 'react'
import Navbar from '../../components/shared/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import FormGroupLayout from '../../layouts/FormGroupLayout';
import FormLayout from '../../layouts/FormLayout';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast'
import { uploadImage } from '../../utils/service';
const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state ?? '/'
    const {
        registerUser,
        loading,
        updateUser,
        googleLogin,
        setLoading, } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const { email, password, name, displayImage } = data;
        setLoading(true);
        registerUser(email, password)
            .then(async (result) => {
                if (result?.user) {
                    const image_url = await uploadImage(displayImage[0]);
                    console.log(image_url);
                    updateUser(name, image_url)
                        .then(result => {
                            console.log(result)
                            toast.success('Register Successfully!');
                            navigate('/', { replace: true })
                        })
                        .catch(error => {
                            console.log('error', error)
                        })
                }
            })
            .catch(e => {
                const code = e.code
                if (code === 'auth/email-already-in-use') {
                    setError('email', 'This email already exists!');
                    toast.error('This Email already exists.')
                }
                else {
                    console.log(e)
                    toast.error('Something Went Wrong!')
                }
            }).finally((res) => setLoading(false))

    }

    const handleGoogleLogin = () => {
        googleLogin().then(result => {
            console.log(result);
            const user = result.user;
            if (user) {
                toast.success('Register Successfully!');
                navigate(from, { replace: true })
            }
        }).catch(error => {
            console.log(error);
            toast.error('Something went wrong!');
        })
    }
    return (
        <div>
            <Navbar />
            <div className='flex flex-col lg:flex-row'>
                <div className='w-full lg:w-[40%] p-4 lg:px-16'>
                    <div className="flex flex-col gap-8">
                        <div className='flex flex-col gap-2'>
                            <Typography variant='h3' className=''>
                                Register
                            </Typography>
                            <Typography variant='paragraph' className=''>
                                Already have an account yet? <Link className='underline' to={'/login'}>Login</Link>
                            </Typography>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormLayout>
                                <FormGroupLayout errorMessage={errors.name?.message}>
                                    <Input label="Name" type='text' {...register("name", { required: 'Name is required!' })} error={errors.name?.message ? true : undefined} />
                                </FormGroupLayout>

                                <FormGroupLayout errorMessage={errors.email?.message}>
                                    <Input label="Email" type='email' {...register("email", { required: 'Email is required!' })} error={errors.email?.message ? true : undefined} />
                                </FormGroupLayout>

                                <FormGroupLayout errorMessage={errors.password?.message}>
                                    <Input label="Password" type='password' {...register("password", {
                                        required: 'Password is required!',
                                        minLength: {
                                            value: 6,
                                            message: "Password atleast 6 characters long!"
                                        }
                                    })} error={errors.password?.message ? true : undefined} />
                                </FormGroupLayout>
                                <FormGroupLayout errorMessage={errors.confirmPassword?.message}>
                                    <Input label="Password" type='password' {...register("confirmPassword", {
                                        required: 'Confirm Password is required!',
                                        minLength: {
                                            value: 6,
                                            message: "Confirm Password atleast 6 characters long!"
                                        },
                                        validate: (value) => {
                                            if (watch('password') != value) {
                                                return "Password do no match";
                                            }
                                        }
                                    })} error={errors.confirmPassword?.message ? true : undefined} />
                                </FormGroupLayout>

                                <FormGroupLayout errorMessage={errors.displayImage?.message}>
                                    <Input label="Profile Image" accept='' type='file' {...register("displayImage", { required: 'Image is required!' })} error={errors.displayImage?.message ? true : undefined} />
                                </FormGroupLayout>
                                <Button type='submit' className='mt-3 flex justify-center items-center' disabled={loading}>
                                    {loading ? <Spinner className="h-4 w-4" /> : "Register"}
                                </Button>
                            </FormLayout>
                        </form>
                        <div>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                                <Button onClick={handleGoogleLogin} variant='outlined' className='w-full border-[#EA4335] flex items-center justify-center gap-2'>
                                    <FcGoogle className='w-5 h-5' />Google
                                </Button>
                                {/* <Button variant='outlined' className='w-full border-[#333] flex items-center justify-center gap-2'>
                                    <FaGithub className='w-5 h-5' /> Github
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <div style={{ backgroundImage: `url('https://wearecsg.com/wp-content/uploads/2023/02/CSG_Blog_Healthcare_Awareness_Campaigns_Banner_Image.jpg')` }}
                        className='h-[calc(100vh-75px)] bg-no-repeat bg-cover'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
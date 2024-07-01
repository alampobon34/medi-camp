import { Button, Spinner, Typography } from '@material-tailwind/react'
import React from 'react'
import Navbar from '../../components/shared/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import FormLayout from '../../layouts/FormLayout';
import FormGroupLayout from '../../layouts/FormGroupLayout';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
const Login = () => {
    const { user, logInUser, loading, setLoading, googleLogin } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location?.state ?? '/'
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { email, password } = data;
        setLoading(true);
        logInUser(email, password).then(userCredential => {
            if (userCredential.user) {
                const user = userCredential.user;
                if (user) {
                    toast.success('Log in successfully!');
                    navigate(from, { replace: true })
                }
            }
        }).catch(error => {
            console.log(error)
            toast.error('Invalid Credentials!', { theme: "colored" });
            setLoading(false);
        }).finally(res => {
            setLoading(false);
        })

    }


    const handleGoogleLogin = () => {
        googleLogin().then(result => {
            console.log(result);
            const user = result.user;
            if (user) {
                toast.success('Log in successfully!');
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
                <div className='w-full lg:w-[40%] p-4 lg:p-16'>
                    <div className="flex flex-col gap-8">
                        <div className='flex flex-col gap-2'>
                            <Typography variant='h3' className=''>
                                Login
                            </Typography>
                            <Typography variant='paragraph' className=''>
                                Doesn't have an account yet? <Link className='underline' to={'/register'}>Register</Link>
                            </Typography>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormLayout>
                                <FormGroupLayout errorMessage={errors.email?.message}>
                                    <Input label="Email" type='email' {...register("email", { required: 'Email is required!' })} error={errors?.email?.message ? true : undefined} />
                                </FormGroupLayout>

                                <FormGroupLayout errorMessage={errors.password?.message}>
                                    <Input label="Password" type='password' {...register("password", { required: 'Password is required!' })} error={errors?.password?.message ? true : undefined} />
                                </FormGroupLayout>
                                <Button type='submit' className='mt-3 flex justify-center items-center' disabled={loading}>
                                    {loading ? <Spinner className="h-4 w-4" /> : "SUBMIT"}
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
                    <div style={{ backgroundImage: `url('https://assets-global.website-files.com/625dc7328f8b4b512565110e/663565571a2103b1bc630a1a_empowering-patients-in-2024-a-paradigm-shift-in-healthcare-marketing.webp')` }}
                        className='h-[calc(100vh-75px)] bg-no-repeat bg-center'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
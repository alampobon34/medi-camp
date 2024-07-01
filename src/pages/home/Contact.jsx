import React, { useEffect } from 'react'
import SectionLayout from '../../layouts/SectionLayout'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";
import FormLayout from '../../layouts/FormLayout';
import FormGroupLayout from '../../layouts/FormGroupLayout';
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <SectionLayout>
            <div data-aos="zoom-in" data-aos-duration="1000">
                <Card className="w-full flex flex-col md:flex-row">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-full md:w-2/5 shrink-0 md:rounded-r-none"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                    <CardBody className='flex-1'>
                        <Typography variant="h4" color="blue-gray" className="mb-4">
                            Contact Us
                        </Typography>
                        <FormLayout>
                            <FormGroupLayout>
                                <Input label='Name' className='w-full' />
                            </FormGroupLayout>
                            <FormGroupLayout>
                                <Input label='Email' />
                            </FormGroupLayout>
                            <FormGroupLayout>
                                <Input label='Subject' />
                            </FormGroupLayout>
                            <FormGroupLayout>
                                <Textarea label='enter the message' />
                            </FormGroupLayout>
                            <FormGroupLayout>
                                <div>
                                    <Button type='button' variant="text" className="flex items-center gap-2 border border-black">
                                        Submit
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </FormGroupLayout>
                        </FormLayout>


                    </CardBody>
                </Card>
            </div>
        </SectionLayout>
    )
}

export default Contact
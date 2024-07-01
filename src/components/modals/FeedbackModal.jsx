import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Textarea } from '@material-tailwind/react'
import React from 'react'
import FormGroupLayout from '../../layouts/FormGroupLayout'
import FormLayout from '../../layouts/FormLayout'
import { Controller, useForm } from 'react-hook-form'

const FeedbackModal = ({ open, handleOpen, handleOnSubmit }) => {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <Dialog open={open} handler={handleOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogHeader>Enter your feedback </DialogHeader>
                <DialogBody>
                    <FormLayout>
                        <FormGroupLayout errorMessage={errors.ratings?.message}>
                            <Controller
                                name='ratings'
                                control={control}
                                rules={{ required: 'Ratings is required!' }}
                                render={({ field }) =>
                                    <Select label='Ratings' onChange={field.onChange} error={errors?.ratings?.message ? true : undefined}>
                                        <Option value='1'>1</Option>
                                        <Option value='2'>2</Option>
                                        <Option value='3'>3</Option>
                                        <Option value='4'>4</Option>
                                        <Option value='5'>5</Option>
                                    </Select>
                                }
                            />
                        </FormGroupLayout>
                        <FormGroupLayout errorMessage={errors.feedback?.message}>
                            <Textarea label='Enter your feedback' size='md' {...register('feedback', { required: 'Feedback is required!' })} error={errors?.feedback?.message ? true : undefined} />
                        </FormGroupLayout>
                    </FormLayout>

                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button type='submit' variant="gradient" color="black">
                        <span>Submit</span>
                    </Button>
                </DialogFooter>
            </form>
        </Dialog >
    )
}

export default FeedbackModal
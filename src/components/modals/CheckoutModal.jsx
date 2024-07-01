import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormLayout from '../../layouts/FormLayout'
import FormGroupLayout from '../../layouts/FormGroupLayout'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './checkout.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'
const CheckoutModal = ({ open, handleOpen, data, refetch }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState()
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (data?.campFee && data?.campFee > 0) {
            getClientSecret({ price: data?.campFee })
        }
    }, [data?.campFee])

    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price)
        setClientSecret(data.clientSecret)
    }


    const handleOnSubmit = async event => {
        event.preventDefault()
        setProcessing(true)
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            setCardError('')
        }
        // confirm payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            })
        if (confirmError) {
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                participantEmail: user?.email,
                participantName: user?.displayName,
                campName: data?.campName,
                campRegisterId: data?._id,
                amount: data?.campFee,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            delete paymentInfo._id
            try {
                const { data } = await axiosSecure.post('/payment', paymentInfo)
                await axiosSecure.patch(`/camp-register/${paymentInfo?.campRegisterId}`, {
                    paymentStatus: "Paid",
                    confirmationStatus: 'Confirmed'
                })
                refetch()
                handleOpen()
                toast.success('Camp Payment Successfully')
                navigate('/dashboard/payment-history')
            } catch (err) {
                toast.error("Somthing Went Wrong!")
                console.log(err)
            }
        }
        setProcessing(false)
    }
    return (
        <Dialog open={open} handler={handleOpen} bacdrop="static">
            <DialogHeader>Payment Checkout</DialogHeader>
            <DialogBody>
                <form >
                    <FormLayout>
                        <FormGroupLayout>
                            <Input label='Camp Name' value={data?.campName} readOnly />
                        </FormGroupLayout>
                        <FormGroupLayout>
                            <div className='flex items-center gap-2'>
                                <Input label='Location' value={data?.location} readOnly />
                                <Input label='Participant Name' value={data?.participantName} readOnly />
                            </div>
                        </FormGroupLayout>
                        <FormGroupLayout>
                            <Input label='Camp Fees ($)' value={data?.campFee} readOnly />
                        </FormGroupLayout>
                        <FormGroupLayout errorMessage={cardError ?? ''}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },

                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </FormGroupLayout>
                    </FormLayout>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    disabled={processing}
                    variant="gradient"
                    color="red"
                    onClick={handleOpen}
                    className="mr-2"
                >
                    <span>Cancel</span>
                </Button>
                <Button disabled={!stripe || !clientSecret || processing} variant="gradient" color="black" onClick={handleOnSubmit}>
                    <span>Pay ${data?.campFee}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default CheckoutModal
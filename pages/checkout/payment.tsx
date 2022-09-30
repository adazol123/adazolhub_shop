import { CreditCardIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import React, { Fragment } from 'react'
import HeaderNavOverlay from '../../components/header/Overlay'
import Button from '../../components/ui/buttons/Button'
import ButtonLink from '../../components/ui/buttons/ButtonLink'
import CreditCard from '../../components/ui/cards/credit_card'
import ErrorInfoWrapper from '../../components/ui/error/ErrorInfoWrapper'
import TextInput from '../../components/ui/input/TextInput'
import InformationCard from './../../components/ui/cards/information/index';

type Props = {}

const Payment = (props: Props) => {
    return (
        <Fragment>
            <Head>
                <title>Payment - Adazolhub | Shop</title>
            </Head>
            <HeaderNavOverlay title='Payment Method' />
            <section className='min-h-[calc(100vh-58px)] md:min-h-[80vh] md:mb-10'>
                <div className='mt-6'>
                    <CreditCard
                        bank='BPI'
                        cardHolder='Danyel'
                        cardNumber={4324324545}
                        type='Visa'
                        className='fill-indigo-800'
                    />
                </div>
                <div className='rounded-md py-2 px-3 bg-rose-100 my-3'>
                    <span className='text-rose-600'>This credit card section is for demo purposes only. Please do not enter your real credit card details.</span>
                </div>
                <div className="flex flex-col h-full gap-2 md:flex-row mt-3 md:mt-10">

                    <h4>Credit Card Information</h4>
                    <form className='flex flex-col gap-3'>
                        <TextInput placeholder='Card Holder' />
                        <TextInput placeholder='Card Number' />
                        <div className='flex gap-3 w-full'>
                            <TextInput shrink='expand' placeholder='Expiry Date' />
                            <TextInput shrink='shrink' placeholder='CVV' />

                        </div>
                    </form>
                </div>
                <div className='flex w-full justify-between items-center mt-10'>
                    <ButtonLink className='flex-1' >Cancel</ButtonLink>
                    <Button>Confirm Payment</Button>
                </div>
            </section>
        </Fragment>
    )
}

export default Payment
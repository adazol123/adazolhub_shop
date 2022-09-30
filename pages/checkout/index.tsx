import { MapPinIcon, PencilSquareIcon, PhoneIcon, TruckIcon, UserIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../app/redux/hook'
import Footer from '../../components/footer'
import HeaderNav from '../../components/header'
import HeaderNavOverlay from '../../components/header/Overlay'
import CartCardFooter from '../../components/ui/cards/cart/footer'
import CheckoutCard from '../../components/ui/cards/checkout'
import CheckoutCardFooter from '../../components/ui/cards/checkout/footer'
import Bleed from '../../components/ui/layouts/Bleed'

type Props = {}

const Checkout: NextPage = () => {
    const carts = useAppSelector(state => state.cart.carts)
    const total = useAppSelector(state => state.cart.total)
    const router = useRouter()

    return (
        <Fragment>
             <Head>
                <title>Checkout - Adazolhub | Shop</title>
            </Head>
            <HeaderNavOverlay title='Checkout' />
            <section className='min-h-[calc(100vh-58px)] md:min-h-[80vh] md:mb-10'>
                <div className="flex flex-col-reverse h-full gap-6 md:flex-row md:mt-10">


                    <div>
                        <h4>Order Summary</h4>
                        <div className="flex flex-col gap-3 p-3 mt-2 rounded-lg bg-theme-gray-100">
                            <div className="flex flex-col gap-3 md:min-h-[360px]" >
                                {carts.map(item => (
                                    <CheckoutCard
                                        key={item.product_id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.product.metatags.images[0].url}
                                        quantity={item.quantity}
                                        size={item.size}
                                        color={item.color}
                                    />
                                ))}
                            </div>

                            <hr />
                            <div className='flex flex-col gap-1'>
                                <div className="flex justify-between w-full">
                                    <span>Shipping fee</span>
                                    <span><strong>Free</strong></span>

                                </div>
                                <div className="flex justify-between w-full">
                                    <span>Total</span>
                                    <span><strong>P {total.toFixed(2)}</strong></span>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-8 md:sticky md:self-start md:top-20'>
                        <div>
                            <h4>Payment Method</h4>
                            <div className='flex gap-6 mt-2'>
                                <button onClick={() => {
                                    router.push('checkout/payment')
                                }} className='p-3 rounded-lg bg-theme-gray-100'>
                                    <span>Credit/Debit Card</span>
                                </button>
                                <button className='p-3 rounded-lg bg-theme-gray-100 disabled:opacity-50' disabled>
                                    <span>Gcash</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4>Shipping Address</h4>
                            <div className='flex flex-col px-2 py-3 mt-2 rounded-lg bg-theme-gray-100'>
                                <div className='flex items-start w-full gap-2 jusstify-between'>
                                    <span><TruckIcon className='w-5 h-5' /></span>
                                    <div className='flex flex-col'>
                                        <span className='line-clamp-2'>Unit 403, Camp Bagong Diwa, Taguig City, 1732</span>
                                        <span className='opacity-50'>Danyle Lozada</span>
                                        <span className='opacity-50'>6456478578</span>
                                    </div>
                                    <button className='relative px-3 py-3 -mt-3 -mr-3 text-xs rounded-full'><PencilSquareIcon className='w-5 h-5' /></button>
                                </div>
                            </div>
                        </div>
                        <div className='hidden md:block'>
                            <SupportedCards />
                        </div>
                        <div className='container sticky bottom-0 z-30 hidden px-6 mx-auto md:block bg-white sm:bg-transparent'>

                            <CheckoutCardFooter disabled amount={total} />
                        </div>
                    </div>
                </div>
                <div className='mt-6 mb-10 md:hidden '>
                    <SupportedCards />
                </div>
            </section>
            {
                total > 0 && <div className='container sticky bottom-0 z-30 px-6 mx-auto md:hidden bg-white sm:bg-transparent'>

                    <CheckoutCardFooter disabled amount={total} />
                </div>
            }
            <Bleed className='text-white bg-neutral-800'>
                <Footer />
            </Bleed>
        </Fragment >
    )
}

const SupportedCards = () => {
    return (
        <Fragment>
            <h5 className='opacity-50'>Suppported Cards</h5>
            <div className='flex gap-6 mt-3'>
                <Image src={'/svg/visa.svg'} width={32} height={28} alt='' />
                <Image src={'/svg/master-card.svg'} width={32} height={28} alt='' />
                <Image src={'/svg/amex.svg'} width={32} height={28} alt='' />
            </div>
        </Fragment>
    )
}

export default Checkout
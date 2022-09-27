import { MapPinIcon, PencilSquareIcon, PhoneIcon, TruckIcon, UserIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../app/redux/hook'
import Footer from '../../components/footer'
import HeaderNav from '../../components/header'
import CartCardFooter from '../../components/ui/cards/cart/footer'
import Bleed from '../../components/ui/layouts/Bleed'

type Props = {}

const Checkout: NextPage = () => {
    const total = useAppSelector(state => state.cart.total)
    return (
        <Fragment>
            <HeaderNav />
            <section className='min-h-[calc(100vh-58px)] md:min-h-[80vh] md:mb-10'>
                <div className="flex flex-col-reverse h-full gap-6 md:flex-row md:mt-10">


                    <div>
                        <h4>Order Summary</h4>
                        <div className="flex flex-col gap-3 p-3 mt-2 rounded-lg bg-theme-gray-100">
                            <div className="flex flex-col gap-3 min-h-[400px]" >
                                <div className="relative flex gap-1 overflow-hidden rounded-lg card">
                                    <div className='relative w-24 h-20 overflow-hidden rounded-md'>
                                        <Image src={'https://images.unsplash.com/photo-1618354691551-44de113f0164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80'} layout='fill' objectFit='cover' alt='item' />
                                    </div>
                                    <div className='flex flex-col min-h-[48px] p-2 w-full gap-2'>
                                        <h5 className=' line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nisi repellendus error soluta! Explicabo?</h5>
                                        <div className='flex justify-between w-full opacity-50'>
                                            <span>Black/Small</span>
                                            <h5>P 2,123.00</h5>
                                        </div>
                                    </div>
                                    <div className='absolute top-0 left-0 flex items-center justify-center w-6 h-6 text-white rounded-tl-lg rounded-br-xl bg-marine-700'>
                                        <span>3</span>
                                    </div>
                                </div>
                                <div className="relative flex gap-1 overflow-hidden rounded-lg card">
                                    <div className='relative w-24 h-20 overflow-hidden rounded-md'>
                                        <Image src={'https://images.unsplash.com/photo-1618354691551-44de113f0164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80'} layout='fill' objectFit='cover' alt='item' />
                                    </div>
                                    <div className='flex flex-col min-h-[48px] p-2 w-full gap-2'>
                                        <h5 className=' line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nisi repellendus error soluta! Explicabo?</h5>
                                        <div className='flex justify-between w-full opacity-50'>
                                            <span>Black/Small</span>
                                            <h5>P 2,123.00</h5>
                                        </div>
                                    </div>
                                    <div className='absolute top-0 left-0 flex items-center justify-center w-6 h-6 text-white rounded-tl-lg rounded-br-xl bg-marine-700'>
                                        <span>3</span>
                                    </div>
                                </div>
                                <div className="relative flex gap-1 overflow-hidden rounded-lg card">
                                    <div className='relative w-24 h-20 overflow-hidden rounded-md'>
                                        <Image src={'https://images.unsplash.com/photo-1618354691551-44de113f0164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80'} layout='fill' objectFit='cover' alt='item' />
                                    </div>
                                    <div className='flex flex-col min-h-[48px] p-2 w-full gap-2'>
                                        <h5 className=' line-clamp-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nisi repellendus error soluta! Explicabo?</h5>
                                        <div className='flex justify-between w-full opacity-50'>
                                            <span>Black/Small</span>
                                            <h5>P 2,123.00</h5>
                                        </div>
                                    </div>
                                    <div className='absolute top-0 left-0 flex items-center justify-center w-6 h-6 text-white rounded-tl-lg rounded-br-xl bg-marine-700'>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className='flex flex-col gap-1'>
                                <div className="flex justify-between w-full">
                                    <span>Shipping fee</span>
                                    <span><strong>Free</strong></span>

                                </div>
                                <div className="flex justify-between w-full">
                                    <span>Total</span>
                                    <span><strong>P 1234.97</strong></span>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-8 md:sticky md:self-start md:top-20'>
                        <div>
                            <h4>Payment Method</h4>
                            <div className='flex gap-6 mt-2'>
                                <button className='p-3 rounded-lg bg-theme-gray-100'>
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
                            <h5 className='opacity-50'>Suppported Cards</h5>
                            <div className='flex gap-6 mt-3'>
                                <Image src={'/svg/visa.svg'} width={32} height={28} alt='' />
                                <Image src={'/svg/master-card.svg'} width={32} height={28} alt='' />
                                <Image src={'/svg/amex.svg'} width={32} height={28} alt='' />
                            </div>
                        </div>
                        <div className='container sticky bottom-0 z-30 hidden px-6 mx-auto md:block bg-marine-100 sm:bg-transparent'>

                            <CartCardFooter amount={total} />
                        </div>
                    </div>
                </div>
                <div className='mt-6 mb-10 md:hidden '>
                    <h5 className='opacity-50'>Suppported Cards</h5>
                    <div className='flex gap-6 mt-3'>
                        <Image src={'/svg/visa.svg'} width={32} height={28} alt='' />
                        <Image src={'/svg/master-card.svg'} width={32} height={28} alt='' />
                        <Image src={'/svg/amex.svg'} width={32} height={28} alt='' />
                    </div>
                </div>
            </section>
            {
                total > 0 && <div className='container sticky bottom-0 z-30 px-6 mx-auto md:hidden bg-marine-100 sm:bg-transparent'>

                    <CartCardFooter amount={total} />
                </div>
            }
            <Bleed className='text-white bg-neutral-800'>
                <Footer />
            </Bleed>
        </Fragment >
    )
}

export default Checkout
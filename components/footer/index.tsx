import Image from 'next/image'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='container mx-auto grid gap-6 px-2 md:px-6'>

            <div className='flex flex-col gap-1 self-start opacity-50'>
                <button className='text-start py-1 px-2'>Shop</button>
                <button className='text-start py-1 px-2'>Categories</button>
                <button className='text-start py-1 px-2'>Legal</button>
            </div>

            <div>
                <div className='relative w-full h-16 px-5 pointer-events-none'>
                    <Image src={'/svg/adazolhub_shop_logo_desktop.svg'} alt='adazolhub_shop_logo' layout='fill' />
                </div>
            </div>

            <a href="" className='mx-auto w-fit font-thin opacity-75'>
                <span className='text-tiny tracking-widest'>Copyright 2022 © Adazolhub.com | All right reserved.</span>
            </a>
        </div>
    )
}

export default Footer
import Image from 'next/image'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='container grid gap-6 px-2 mx-auto md:grid-cols-3 md:px-6'>

            <div className='flex flex-col self-start gap-3 opacity-50'>
                <button className='px-2 py-1 text-tiny text-start'>Shop</button>
                <button className='px-2 py-1 text-tiny text-start'>Categories</button>
                <button className='px-2 py-1 text-tiny text-start'>Legal</button>
            </div>

            <div>
                <div className='relative w-full h-16 px-5 pointer-events-none'>
                    <Image src={'/svg/adazolhub_shop_logo_desktop.svg'} alt='adazolhub_shop_logo' layout='fill' />
                </div>
            </div>

            <a href="" className='mx-auto font-thin opacity-75 w-fit'>
                <span className='tracking-widest text-tiny'>Adazolhub.com © 2022 | All right reserved.</span>
            </a>
        </div>
    )
}

export default Footer
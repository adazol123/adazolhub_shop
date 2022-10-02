import Image from 'next/image'
import React from 'react'

type Props = {
    image: string,
    quantity: number,
    name: string,
    price: number,
    color: string,
    size: string
}

const CheckoutCard = (props: Props) => {
    return (
        <div className="relative flex gap-1 overflow-hidden rounded-lg card">
            <div className='relative w-20 h-14 overflow-hidden rounded-md'>
                <Image src={props.image} layout='fill' objectFit='cover' alt={props.name} />
            </div>
            <div className='flex flex-col min-h-[48px] p-2 w-full gap-2'>
                <h5 className=' line-clamp-1 min-h-[16px]'>{props.name}</h5>
                <div className='flex justify-between w-full opacity-50'>
                    <span>{props.color}/{props.size}</span>
                    <h5>P {props.price.toFixed(2)} X {props.quantity}</h5>
                </div>
            </div>
            <div className='absolute top-0 left-0 flex items-center justify-center w-6 h-6 text-white rounded-tl-lg rounded-br-xl bg-marine-700'>
                <span>{props.quantity}</span>
            </div>
        </div>
    )
}

export default CheckoutCard
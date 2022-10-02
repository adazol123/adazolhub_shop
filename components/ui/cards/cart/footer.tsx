import React, { MouseEventHandler } from 'react'
import Button from '../../buttons/Button'

type Props = {
    amount: number,
    onClick?: MouseEventHandler<Element>
}

const CartCardFooter = (props: Props) => {
    return (
        <div className='flex items-center justify-end w-full py-3'>
            <div className='flex gap-3'>
                <div className='flex flex-col items-end'>
                    <span className='opacity-50 whitespace-nowrap'>Sub-total</span>
                    <h4 className='font-bold text-theme-gray-700 whitespace-nowrap'>₱ {props.amount.toFixed(2)}</h4>
                </div>
                <Button onClick={props.onClick}>
                    Checkout
                </Button>
            </div>
        </div>
    )
}

export default CartCardFooter
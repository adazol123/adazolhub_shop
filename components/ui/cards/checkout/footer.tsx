import React, { MouseEventHandler } from 'react'
import Button from '../../buttons/Button'

type Props = {
    amount: number,
    onClick?: MouseEventHandler<Element>,
    disabled?: boolean
}

const CheckoutCardFooter = (props: Props) => {
    return (
        <div className='flex items-center justify-end w-full py-3'>
            <div className='flex gap-3'>
                <div className='flex flex-col items-end'>
                    <span className='opacity-50 whitespace-nowrap'>Total</span>
                    <h4 className='font-bold text-theme-gray-700 whitespace-nowrap'>P {props.amount.toFixed(2)}</h4>
                </div>
                <Button disabled={props.disabled} onClick={props.onClick}>
                    Place Order
                </Button>
            </div>
        </div>
    )
}

export default CheckoutCardFooter
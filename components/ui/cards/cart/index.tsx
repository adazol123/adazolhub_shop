import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hook'
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../../../features/cart/cart.slice'

type Props = {}

const CartCard = (props: Props) => {
  const carts = useAppSelector(state => state.cart.carts)
  const dispatch = useAppDispatch()
  return (
    <div className='my-6 flex flex-col gap-2'>
      {carts.map(cart => (
        <div key={cart.product_id}
          className='flex gap-2  bg-gradient-to-br from-white to-marine-100/50 overflow-hidden rounded-md'
        >
          <div className='w-24 h-[150px] relative rounded-md overflow-hidden'>
            <Image
              src={cart.product.metatags.images[0].url}
              alt={cart.name.slice(0, 20)}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='flex-1 py-2 pr-2 flex flex-col gap-4 h-full justify-between'>
            <div className='min-h-[84px]'>

              <p className='line-clamp-3'>{cart.name}</p>
              <div className='flex gap-2 mt-2'>
                <span >Size: <strong>{cart.size}</strong></span>
                <span>Color: <strong>{cart.color}</strong></span>
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className='flex gap-2 items-center rounded-md border'>
                <button className='p-2' onClick={() => {
                  if (cart.quantity !== 1) {
                    dispatch(decrementQuantity(cart.product_id))
                  } else {
                    dispatch(removeFromCart(cart.product_id))
                  }
                }}><MinusIcon /></button>
                <span>{cart.quantity}</span>
                <button className='p-2' onClick={() => dispatch(incrementQuantity(cart.product_id))}><PlusIcon /></button>
              </div>
              <h4 className='whitespace-nowrap text-marine-700'>₱ {cart.price.toFixed(2)}</h4>
            </div>
          </div>

        </div>
      ))}
    </div>
  )
}

export default CartCard
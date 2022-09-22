import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../app/redux/hook'
import Button from '../../components/ui/buttons/Button'
import CartCard from '../../components/ui/cards/cart'

type Props = {}

const Cart = (props: Props) => {
    const carts = useAppSelector(state => state.cart.carts)
    const router = useRouter()


    return (
        <Fragment>
            <Head>
                <title>Login - Adazolhub | Shop</title>
            </Head>
            <section>

                {carts.length ?
                    <CartCard />
                    : <div className='grid min-h-[calc(100vh-56px)] place-content-center place-items-center gap-10'>
                        <div className='grid place-items-center gap-2'>

                            <ShoppingBagIcon className='w-14 h-14 text-marine-500' />
                            <p>

                                Cart is empty
                            </p>
                        </div>
                        <Button styled='outline' className='rounded-full'
                            onClick={() => router.replace('/')}
                        >Continue Shopping</Button>
                    </div>
                }
            </section>
        </Fragment>
    )
}

export default Cart
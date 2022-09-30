import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../app/redux/hook'
import Button from '../../components/ui/buttons/Button'
import CartCard from '../../components/ui/cards/cart'
import Bleed from './../../components/ui/layouts/Bleed';
import Footer from './../../components/footer/index';
import HeaderNav from '../../components/header'
import CartCardFooter from '../../components/ui/cards/cart/footer'
import HeaderNavOverlay from '../../components/header/Overlay'

type Props = {}

const Cart = (props: Props) => {
    const carts = useAppSelector(state => state.cart.carts)
    const total = useAppSelector(state => state.cart.total)
    const router = useRouter()


    return (
        <Fragment>
            <Head>
                <title>Cart - Adazolhub | Shop</title>
            </Head>
            <HeaderNavOverlay title='Cart' />
            <section className='min-h-[calc(100vh-58px)]'>

                {carts.length ?
                    <CartCard />
                    : <div className='grid min-h-[calc(100vh-56px)] place-content-center place-items-center gap-10'>
                        <div className='grid gap-2 place-items-center'>

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
            {total > 0 && <div className='container sticky bottom-0 z-30 px-6 mx-auto bg-marine-100 sm:bg-transparent'>

                <CartCardFooter amount={total} onClick={() => router.push('/checkout')} />
            </div>}
            <Bleed className='text-white bg-neutral-800'>
                <Footer />
            </Bleed>
        </Fragment>
    )
}

export default Cart
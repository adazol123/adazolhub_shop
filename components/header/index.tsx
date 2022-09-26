import React, { Fragment } from 'react'
import { QueueListIcon, ShoppingCartIcon, Squares2X2Icon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import Button from '../ui/buttons/Button'
import { selectCurrentAuth } from '../../features/user/user-auth.slice'
import { useRouter } from 'next/router'
import SideModal from '../ui/modals/side'
import { toggleState } from '../../features/toggle/toggle.slice'
import { useScrollDisable } from '../../hooks/useScrollDisable'
import CategoryCard from '../ui/cards/Category'
import ButtonLink from '../ui/buttons/ButtonLink'
type Props = {}

const HeaderNav = (props: Props) => {
    const router = useRouter()
    const cart = useAppSelector(store => store.cart.carts)

    const quantityIndicator = cart.reduce((acc, { quantity: current }) => acc + current, 0)
    let toggle = useAppSelector(state => state.toggle.toggle.side_nav)
    const dispatch = useAppDispatch()
    useScrollDisable(toggle)
    return (
        <Fragment>
            <header className='sticky top-0 z-30 bg-gradient-to-tr from-white to-marine-100 shadow-sm'>
                <div className='container mx-auto px-6 flex justify-between items-center min-h-nav-height 
            '>
                    <span>Adazolhub | Shop</span>
                    <div className='flex gap-2'>

                        {quantityIndicator > 0 && <button className='p-2 bg-white rounded-full relative'
                            onClick={() => router.push('/cart')}
                        >
                            <ShoppingCartIcon className='w-5 h-5' />
                            {quantityIndicator > 0 && <span className='p-1 rounded-full text-white bg-rose-600 text-[0.55rem] min-w-[4ch] absolute -top-0 -right-1 flex justify-center items-center leading-[10px] border-2 border-marine-100' >{quantityIndicator}</span>}
                        </button>}
                        <button className='p-2 bg-white rounded-full relative'
                            onClick={() => dispatch(toggleState('side_nav'))}
                        ><Squares2X2Icon className='w-5 h-5' /></button>
                    </div>
                </div>
            </header>
            {toggle &&
                <SideModal
                    state={toggle}
                    toggleStateHandler={() => dispatch(toggleState('side_nav'))}
                    enableFooter
                    footer={<Footer />}
                >
                    <div className='container mx-auto px-0 flex gap-10 justify-between items-center min-h-nav-height 
            '>
                        <span>Adazolhub | Shop</span>
                        <div className='flex gap-2'>

                            {quantityIndicator > 0 && <button className='p-2 bg-white rounded-full relative'
                                onClick={() => router.push('/cart')}
                            >
                                <ShoppingCartIcon className='w-5 h-5' />
                                {quantityIndicator > 0 && <span className='p-1 rounded-full text-white bg-rose-600 text-[0.55rem] min-w-[4ch] absolute -top-0 -right-1 flex justify-center items-center leading-[10px] border-2 border-marine-100' >{quantityIndicator}</span>}
                            </button>}
                            <button className='p-2 bg-white rounded-full relative'
                                onClick={() => dispatch(toggleState('side_nav'))}
                            >
                                {toggle ? <XMarkIcon className='w-5 h-5' /> : <Squares2X2Icon className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    {/** Content */}
                    <div className="gap-3 px-0 grid md:-ml-3 md:flex grid-cols-2 md:flex-col w-full">
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md row-span-4 md:row-span-1 flex items-end'>Home</button>
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md row-span-2 md:row-span-1 flex items-end'>Category</button>
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md flex items-end'>Support</button>
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md flex items-end'>About</button>
                    </div>
                </SideModal>}
        </Fragment>
    )
}


const Footer = () => {
    const user = useAppSelector(selectCurrentAuth)
    const router = useRouter()
    const dispatch = useAppDispatch()
    return (
        <div className='min-h-nav-height w-full'>
            {user ?
                <ButtonLink className='flex gap-1 w-full bg-white' onClick={() => {
                    router.push('/account')
                    dispatch(toggleState('side_nav'))
                }}>
                    <UserCircleIcon className='w-8 h-8' />
                    <div className='flex flex-col gap-1 items-start'>
                        <span>{user.displayName}</span>
                        <span className='text-[0.5rem] opacity-50'>{user.email}</span>
                    </div>
                </ButtonLink>
                : <Button className='w-full' onClick={() => {
                    router.push('/login')
                    dispatch(toggleState('side_nav'))
                }}> Getting Started </Button>}
        </div>
    )
}
export default HeaderNav
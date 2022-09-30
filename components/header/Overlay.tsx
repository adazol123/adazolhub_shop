import { ArrowLeftIcon, ShoppingCartIcon, Squares2X2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { NavFooter } from '.'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import { toggleState } from '../../features/toggle/toggle.slice'
import { useScrollDisable } from '../../hooks/useScrollDisable'
import SideModal from '../ui/modals/side'

type Props = {
    title?: string
}

const HeaderNavOverlay = (props: Props) => {
    const router = useRouter()

    let toggle = useAppSelector(state => state.toggle.toggle.side_nav)
    const dispatch = useAppDispatch()
    useScrollDisable(toggle)

    return (
        <Fragment>
            <header className='sticky top-0 z-30 shadow-sm bg-gradient-to-tr from-white to-marine-100'>
                <div className='container flex items-center justify-between px-6 mx-auto min-h-nav-height '>
                    <button className='p-2 rounded-full' onClick={() => router.back()}><ArrowLeftIcon /></button>
                    {props.title &&
                        <h4>{props.title.toLocaleUpperCase()}</h4>
                    }
                    <div className='flex gap-2'>
                        <button className='relative p-2 bg-white rounded-full'
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
                    footer={<NavFooter />}
                >
                    <div className='container flex items-center justify-between gap-10 px-0 mx-auto min-h-nav-height '>
                        <span>Adazolhub | Shop</span>
                        <div className='flex gap-2'>


                            <button className='relative p-2 bg-white rounded-full'
                                onClick={() => dispatch(toggleState('side_nav'))}
                            >
                                {toggle ? <XMarkIcon className='w-5 h-5' /> : <Squares2X2Icon className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    {/** Content */}
                    <div className="grid w-full grid-cols-2 gap-3 px-0 md:-ml-3 md:flex md:flex-col">
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md row-span-4 md:row-span-1 flex items-end'>Home</button>
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md row-span-2 md:row-span-1 flex items-end'>Category</button>
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md flex items-end'>Support</button>
                        <button className='text-tiny min-h-[58px] shadow bg-white p-3 rounded-md flex items-end'>About</button>
                    </div>
                </SideModal>}
        </Fragment>
    )
}

export default HeaderNavOverlay
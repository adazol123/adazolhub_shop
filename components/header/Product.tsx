import { ArrowLeftIcon, Squares2X2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { NavFooter } from '.'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import { toggleState } from '../../features/toggle/toggle.slice'
import { useScrollDisable } from '../../hooks/useScrollDisable'
import SideModal from '../ui/modals/side'
import { ProductItemProps } from './../../utils/type/types';

type Props = {
    product: ProductItemProps
}

const HeaderNavProduct = (props: Props) => {
    const router = useRouter()

    let toggle = useAppSelector(state => state.toggle.toggle.side_nav)
    const dispatch = useAppDispatch()
    return (
        <Fragment>
            <header className='fixed w-full top-0 z-30 bg-transparent text-white'>
                <div className='container flex items-center justify-between gap-10 px-6 mx-auto min-h-nav-height '>
                    <div className='flex flex-col'>
                        <p className='line-clamp-1'>{props.product.name}</p>
                        <span className='opacity-50'>P {props.product.price}</span>
                    </div>

                    <div className='flex gap-2'>
                        <button className='relative p-2  rounded-full bg-black/5'
                            onClick={() => router.back()}
                        >
                            <XMarkIcon className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default HeaderNavProduct
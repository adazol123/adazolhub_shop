import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { Fragment, ReactNode } from 'react'
import { ProductItemProps } from '../../../../utils/type/types'
import style from './style.module.css'
type Props<T> = {
    product: T,
    children?: ReactNode,
    tag?: string
}

const ProductCard = <T extends ProductItemProps>(props: Props<T>) => {
    return (
        <Fragment>
            <div className={style._product}>
                <div className={style._product__header}>
                    <figure className={style._product__image}>
                        <Image
                            src={props.product.metatags.images[0].url}
                            alt={props.product.description}
                            className="mix-blend-darken rounded-lg overflow-hidden"
                            objectFit="cover"
                            layout="fill"
                            blurDataURL={props.product.metatags.images[0].url}
                            placeholder={"blur"}
                        />
                        {props.tag && <span className={style._product_tag}>{props.tag}</span>}
                        <ShoppingBagIcon className='w-6 h-6 absolute bottom-2 right-2 text-white' />
                    </figure>
                </div>
                <div className={style._product__footer}>
                    <p className='line-clamp-2 text-theme-gray-700 opacity-75 min-h-[42px]'>{props.product.name}</p>
                    <h4>₱ {props.product.price.toFixed(2)}</h4>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductCard
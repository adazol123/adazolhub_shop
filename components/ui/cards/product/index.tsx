import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { Fragment, ReactNode } from 'react'
import { ProductItemProps } from '../../../../utils/type/types'
import style from './style.module.css'
type Props<T> = {
    product: T,
    children: ReactNode,
    tag?: string
}

const ProductCard = <T extends ProductItemProps>(props: Props<T>) => {
    return (
        <Fragment>
            <div className={style._product}>
                <div className={style._product__header}>
                    <picture className={style._product__image}>
                        <Image
                            src={props.product.metatags.images[0].url}
                            alt={props.product.description}
                            className=""
                            objectFit="cover"
                            layout="fill"
                            blurDataURL={props.product.metatags.images[0].url}
                            placeholder={"blur"}
                        />
                        <span className={style._product_tag}>{props.tag}</span>
                    </picture>
                </div>
                <div className={style._product__footer}>

                </div>
            </div>
        </Fragment>
    )
}

export default ProductCard
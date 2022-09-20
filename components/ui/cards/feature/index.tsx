import Image from 'next/image'
import React from 'react'
import style from './style.module.css'
type Props = {}

const FeatureCard = (props: Props) => {
    return (
        <div className={style._feature}>
            <Image
                src='https://images.unsplash.com/photo-1602700265157-953914742786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                alt='feature-1'
                layout='fill'
                loading='lazy'
                placeholder='blur'
                objectFit='cover'
                blurDataURL='https://images.unsplash.com/photo-1602700265157-953914742786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4&q=10'
                className='mix-blend-multiply'
            />
            <div className={style._feature__footer}>

                <p className={style._feature__title}>Antonios Clothing Solid Elegant Long-Sleeve Shirt</p>
                <div className={style._feature__sub}>
                    <h4 className={style._feature__price}>₱ 870.00</h4>
                    <button className={style._feature__button}>View Product</button>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard
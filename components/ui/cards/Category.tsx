import Image from 'next/image'
import React from 'react'

type Props = {
    img_source: string,
    label: string,
    full?: boolean
}

const CategoryCard = (props: Props) => {
    return (
        <div className={` rounded-lg relative p-1 bg-gradient-to-t from-neutral-900/70 via-neutral-900/60 overflow-hidden cursor-pointer hover:drop-shadow
      ${props.full ? "w-full h-20" : "w-[140px]  md:w-52 h-[56px] md:h-[72px]"}
    `}>
            <Image src={`${props.img_source}&w=320&q=50`}
                alt='category_image' layout='fill'
                objectFit='cover' className='select-none bg-blend-darken'
                loading='lazy'
                placeholder='blur'
                blurDataURL={`${props.img_source}&w=50&q=1`}

            />

            <div className="left-4 z-10 bottom-2  absolute">
                <span className='text-xs md:text-sm font-bold text-white'>{props.label}</span>
            </div>
        </div>
    )
}

export default CategoryCard
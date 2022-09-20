import React from 'react'

type Props = {}

const ProductSkeleton = (props: Props) => {

    return (
        <div className='flex flex-wrap w-full gap-4 py-3 '>
            {new Array(12).fill('').map((_, index) => (
                <div key={index}
                    className='w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]  rounded-xl overflow-hidden bg-white shadow'
                >
                    <div className='relative w-full h-44 md:h-64 bg-theme-gray-600/50 rounded-xl mix-blend-darken animate-pulse delay-150' />
                    <div className='py-3 space-y-2'>
                        <div className='bg-theme-gray-300/75 rounded-md min-h-[42px] animate-pulse delay-500' />
                        <div className='bg-theme-gray-300/75 rounded-md min-h-[30px] animate-pulse ' />
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default ProductSkeleton
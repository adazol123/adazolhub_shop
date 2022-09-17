import React from 'react'

const HorizontalDivider = () => {
    return (
        <div className='relative inline-flex items-center gap-6 select-none text-theme-gray-500 min-w-[264px] text-xs'>
            <div className='h-[1px] w-full bg-theme-gray-300' />
            <span>OR</span>
            <div className='h-[1px] w-full bg-theme-gray-300' />
        </div>
    )
}

export default HorizontalDivider
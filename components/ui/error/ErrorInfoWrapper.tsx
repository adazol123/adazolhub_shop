import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
type Props = {}

const ErrorInfoWrapper = ({ error }: { error: string | HTMLElement | React.ReactNode | null }) => {
  return (
    <span className='max-w-[264px] w-full text-[0.65rem] text-rose-500 py-3 px-4 bg-rose-50 flex gap-2 rounded'>
            <>
                <InformationCircleIcon className='min-w-[16px] max-w-[20px] min-h-[16px] max-h-[20px]' />
                {error}
            </>
        </span>
  )
}

export default ErrorInfoWrapper
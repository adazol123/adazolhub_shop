import { TvIcon } from '@heroicons/react/24/outline'
import React from 'react'
import style from './style.module.css'
type Props = {
    icon: JSX.Element,
    title: string,
    label: string
}

const InformationCard = (props: Props) => {
    return (
        <div className={style._information}>
            {props.icon}
            <div className={style._information__details}>
                <h3 className='font-light  text-md whitespace-nowrap'>{props.title}</h3>
                <p className='font-thin text-xs opacity-50 leading-4'>
                    {props.label}
                </p>
            </div>
        </div>
    )
}

export default InformationCard
import React from 'react'
import style from './style.module.css'
type Props = {
    children: React.ReactNode,
    className?: string | undefined
}

const Bleed = (props: Props) => {
    return (
        <div className={`${props.className} ${style._bleed}`}>
            {props.children}
        </div>
    )
}

export default Bleed
import { FC, PropsWithChildren } from 'react'
import style from './style.module.css'

const Box: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={style._box}>{children}</div>
    )
}

export default Box
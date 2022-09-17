import { FC, PropsWithChildren } from 'react'
import style from './style.module.css'
const Center: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={style._center}>
            {children}
        </div>
    )
}

export default Center
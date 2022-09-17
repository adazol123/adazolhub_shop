import React from 'react'
import style from './style.module.css'
type Props = {
    toggle: boolean,
    toggleHandler: () => void,
    children: React.ReactNode
}

const MobileModal = (props: Props) => {
    return (
        <>
            {props.toggle && (
                <button
                    onClick={props.toggleHandler}
                    tabIndex={-1}
                    className={style._backdrop}
                />
            )}
            <div
                className={[
                    style._mobile,
                    props.toggle ? style._active : "",
                ].join(" ")}
            >
                <div className={style._content}>
                    <div>{props.children}</div>
                </div>
            </div>
        </>
    )
}

export default MobileModal
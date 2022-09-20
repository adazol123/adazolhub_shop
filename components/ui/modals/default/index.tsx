import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react'
import { useScrollDisable } from '../../../../hooks/useScrollDisable';
import style from './style.module.css'
type ExtendedOptions = {
    children: ReactNode;
    icon: ReactNode;
    title: string;
}
type Props = {
    toggle: boolean;
    toggleHandler: () => void;

} & Partial<ExtendedOptions>

const DefaultModal = (props: Props) => {

    useScrollDisable(props.toggle)
    return (
        <Fragment>
            <Backdrop toggle={props.toggle} toggleHandler={props.toggleHandler} />
            {props.toggle && <div className={style._default__wrapper}>
                <nav>
                    {props.title && (
                        <div className="inline-flex items-center gap-2">
                            {props.icon && <span>{props.icon}</span>}
                            <span>{props.title}</span>
                        </div>
                    )}
                </nav>
                <div className={style._default__content}>
                    <div className="flex w-full justify-end mb-3">

                        <button className='p-2'
                            onClick={props.toggleHandler}
                        ><XMarkIcon /></button>
                    </div>
                    {props.children}
                </div>
            </div>}
        </Fragment>
    )
}

const Backdrop = (props: Props) => {
    return (
        <Fragment>
            {props.toggle && <button
                onClick={props.toggleHandler}
                className={style._backdrop}
            />}
        </Fragment>
    )
}

export default DefaultModal
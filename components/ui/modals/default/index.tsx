import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react'
import { useScrollDisable } from '../../../../hooks/useScrollDisable';
import style from './style.module.css'
import { AnimatePresence, motion } from 'framer-motion';

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
            <AnimatePresence mode='wait'>

                {props.toggle && <motion.div
                    initial={{ y: '100%', opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0.5 }}
                    transition={{
                        bounce: 0.2,
                        duration: 0.4
                    }}
                    drag='y'
                    dragConstraints={{
                        bottom: 0,
                        top: 0
                    }}
                    dragElastic={{
                        bottom: 0.4,
                        top: 0
                    }}

                    className={style._default__wrapper}>
                    <nav>
                        {props.title && (
                            <div className="inline-flex items-center gap-2">
                                {props.icon && <span>{props.icon}</span>}
                                <span>{props.title}</span>
                            </div>
                        )}
                    </nav>
                    <div className={style._default__content}>
                        <div className="flex w-full justify-end">

                            <button className='p-2 -mr-4 -mt-2 rounded-full hover:bg-theme-gray-100'
                                onClick={props.toggleHandler}
                            ><XMarkIcon /></button>
                        </div>
                        {props.children}
                    </div>
                </motion.div>}
            </AnimatePresence>
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
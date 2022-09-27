import React, { Fragment, ReactNode } from 'react'
import style from './style.module.css'
import { ArrowLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion';

type ExtendedOptions = {
    children: ReactNode;
    icon: ReactNode;
    title: string;
    scrollable: boolean;
    enableFooter: boolean;
    footer: ReactNode;
    withHeader: boolean
}

type Props = {
    state: boolean;
    toggleStateHandler: () => void;

} & Partial<ExtendedOptions>


const SideModal = (props: Props) => {
    return (
        <Fragment>
            <Backdrop state={props.state} toggleStateHandler={props.toggleStateHandler} />
            <div className={style._side__wrapper}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        initial={{ y: '100%', opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0.5 }}
                        transition={{
                            bounce: 0.2,
                            duration: 0.3
                        }}
                        className={[
                            style._side,
                            props.state ? style._side__active : "",
                        ].join(" ")}
                    >
                        {props.withHeader && <nav>
                            <div className="inline-flex gap-2 items-center">
                                <button tabIndex={props.state ? 1 : -1} onClick={props.toggleStateHandler}>
                                    <ArrowLeftIcon />
                                </button>
                                <span> {props.title ? props.title : "Title here"}</span>
                            </div>
                        </nav>}
                        <div
                            className={[
                                " px-2 ",
                                props.scrollable ? style._scrollable : "",
                            ].join(" ")}
                        >
                            {props.children}
                        </div>
                        <div>
                            {props.enableFooter && (
                                <div
                                    className={[
                                        style._footer,
                                        props.state ? style.modal_side_footer_delay : "",
                                    ].join(" ")}
                                >
                                    {props.footer}
                                </div>
                            )}
                            <Footer state={props.state} />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Fragment>
    )
}

const Backdrop = (props: Props) => {
    return (
        <Fragment>
            {props.state && <button
                onClick={props.toggleStateHandler}
                className={style._backdrop}
            />}
        </Fragment>
    )
}

function Footer({ state }: { state: boolean }) {
    return (
        <footer
            className={[
                style._footer,
                state ? style.modal_side_footer_delay : "",
                'text-center opacity-50'
            ].join(" ")}
        >

            <a href="http://adazolhub.com" target={"_blank"} rel={"noreferrer"}>
                <span>Copyright 2022 © Adazolhub.com | All right reserved.</span>
                <ArrowSmallRightIcon className="w-3 h-3 -rotate-45 stroke-gray-300 " />
            </a>
        </footer>
    );
}

export default SideModal
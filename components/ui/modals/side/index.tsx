import React, { Fragment, ReactNode } from 'react'
import style from './style.module.css'
import { ArrowLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline'

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
                <div
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
                </div>
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

function Footer(state: boolean) {
    return (
        <footer
            className={[
                style.footer,
                state ? style.modal_side_footer_delay : "",
            ].join(" ")}
        >
            <span>© Copyright 2022 | </span>
            <a href="http://adazolhub.com" target={"_blank"} rel={"noreferrer"}>
                <span>ADAZOLHUB.</span>
                <ArrowSmallRightIcon className="w-3 h-3 -rotate-45 stroke-gray-300 " />
            </a>
        </footer>
    );
}

export default SideModal
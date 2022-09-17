import React, { Fragment, ReactNode } from 'react'
import style from './style.module.css'
import { ArrowLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline'
type ModalProps = {
    title: string | null;
    icon: ReactNode;
    scrollable: boolean;
    enableFooter: boolean;
    footer: ReactNode;
}

type Props = {
    state: boolean;
    toggleStateHandler: () => void;
    children: ReactNode;

}

const SideModal = (props: Props & Partial<ModalProps>) => {
    return (
        <Fragment>
            {props.state && (
                <button
                    className={style.backdrop}
                    tabIndex={-1}
                    onClick={props.toggleStateHandler}
                />
            )}

            <div
                className={[
                    style.modal_side,
                    props.state ? style.modal_side_active : "",
                ].join(" ")}
            >
                <nav>
                    <div className="inline-flex gap-2 items-center">
                        <button tabIndex={props.state ? 1 : -1} onClick={props.toggleStateHandler}>
                            <ArrowLeftIcon />
                        </button>

                        <span> {props.title ? props.title : "Title here"}</span>
                    </div>
                </nav>
                <div
                    className={[
                        "min-h-[calc(100vh-(54px*5.8))] px-2 -mx-2",
                        props.scrollable ? style.scrollable : "",
                    ].join(" ")}
                >
                    {props.children}
                </div>
                {props.enableFooter && (
                    <div
                        className={[
                            style.footer,
                            props.state ? style.modal_side_footer_delay : "",
                        ].join(" ")}
                    >
                        {props.footer}
                    </div>
                )}
            </div>
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
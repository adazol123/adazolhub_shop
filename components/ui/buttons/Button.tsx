import React, { MouseEventHandler } from "react";
import style from "./style.module.css";

interface ButtonTypes {
    icon: React.ReactNode;
    children: React.ReactNode;
    direction: "right" | "left";
    styled: "solid" | "outline" | "dashed";
    title: string;
    disabled: boolean;
    className: HTMLStyleElement | string;
    size: 'small' | 'medium' | 'large' | 'base';
    layout: 'expandded' | 'shrinked';
    type: "button" | "submit" | "reset";
    onClick: React.MouseEventHandler<Element>;
}
/**
 * Button Standard (Theme)
 * @ `icon` accepts an SVG icon on the button
 * @ `direction` accepts either `right | left` for the icon positioning
 * @ `styled` accepts either `solid | outline | dashed` button styling (theme color)
 * @ `className` custom css styling
 * @ `disabled` disable behavior on button
 * @ `onClick` function event handler
 * @ `title` opt-in only available when `icon` is used
 */
const Button = <T extends Partial<ButtonTypes>>(props: T) => {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            type={props.type}
            className={`${props.styled === "outline"
                ? style.button__outline
                : props.styled === "dashed"
                    ? style.button__dashed
                    : style.button__primary
                } ${props.direction === "right" ? "flex-row-reverse" : ""} ${props.size === 'small' ? 'text-[10px] px-3 py-1 gap-2' : props.size === 'medium' ? 'text-xs px-4 py-2 gap-3' : props.size === 'large' ? 'text-base px-8 py-4 gap-5' : 'text-sm px-6 py-3 gap-4'}  ${props.className
                } ${props.layout === 'expandded' ? 'w-full' : null}  `}
        >
            {props.icon && (
                <div className={`${style.button__tittle} ${props.direction === "right" ? "flex-row-reverse" : ""}`}>
                    <span className={`${style.button__icon} ${props.size === 'small' ? 'w-4 h-4' : props.size === 'medium' ? 'w-5 h-5' : props.size === 'large' ? 'w-7 h-7' : 'h-6 w-6'}`}>{props.icon}</span>
                    {props.title && <span>{props.title}</span>}
                </div>
            )}
            {props.children && props.children}
        </button>
    );
};

export default Button;
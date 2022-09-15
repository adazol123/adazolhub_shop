import React from 'react'
import style from './style.module.css'

/**
 * 
 * @param children React Node Element
 * @param size accepts variants `small | medium | large | base` sizes 
 * @returns 
 */
const ButtonLink = <T extends Partial<{
    children: React.ReactNode | React.ReactNode[];
    size: 'small' | 'medium' | 'large' | 'base';
    underline_style: 'expanded' | 'shrinked'
    disabled: boolean;
    title: string;
    type: "button" | "submit" | "reset";
    onClick: React.MouseEventHandler<Element>;
    icon: React.ReactElement;
    className: string

}>>(props: T) => {
    let __size = `_size__${props.size}`
    return (
        <button
            {...props}
            className={`${style._link} ${props.underline_style === 'shrinked' ? style.__shrinked : style.__expanded} ${props.disabled && style.__disabled} ${props.size && style[__size]} ${props.className}`}
        >
            {props.icon && <i>{props.icon}</i>}
            <span className='inline-flex items-center gap-2'> {props.children}</span>
        </button>
    )
}

export default ButtonLink
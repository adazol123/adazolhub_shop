import React, { InputHTMLAttributes } from 'react'
import style from './style.module.css'

const TextInput = <T extends Partial<{
    placeholder: string,
    type: React.HTMLInputTypeAttribute,
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string | number | readonly string[],
    className: string,
    autoFocus: boolean,
    autoComplete: string,
    required: boolean
    shrink: 'shrink' | 'expand'

}>>(props: T) => {
    return (
        <label className={`${style._text__label} ${props.shrink == 'shrink' ? 'min-w-[10ch]' : 'w-full'}`}>
            <input
                placeholder=' '
                className={`${style._text__input} ${props.className}`}
                name={props.name}
                type={props.type}
                onChange={props.onChange}
                value={props.value}
                autoFocus={props.autoFocus}
                {...props}
                autoComplete={props.autoComplete || 'off'}
                required={props.required}
            />
            <span>{props.placeholder}</span>
        </label>
    )
}

export default TextInput
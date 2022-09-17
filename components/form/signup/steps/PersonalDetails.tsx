import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { StepperProps, StepperValue } from '../../../../utils/type/types'
import Button from '../../../ui/buttons/Button'
import ButtonLink from '../../../ui/buttons/ButtonLink'
import ErrorInfoWrapper from '../../../ui/error/ErrorInfoWrapper'
import TextInput from '../../../ui/input/TextInput'

type Props = StepperProps<Omit<StepperValue, 'step'>>
type ErrorType = {
    username: string,
    fullname: string
}
const PersonalDetails = (props: Props) => {
    const { error, setError, Continue, Previous } = usePersonalDetailsHandler(props)

    return (
        <form className="flex flex-col gap-8">
            <div className='flex flex-col gap-3'>
                {error?.fullname ? <ErrorInfoWrapper error={error.fullname} /> : error?.username ? <ErrorInfoWrapper error={error.username} /> : null}
                <TextInput
                    type={"text"}
                    placeholder={"Username"}
                    value={props.values.username}
                    autoFocus
                    onChange={(e) => {
                        setError((prev) => (prev = { ...prev, username: undefined }));
                        props.handleInputChange("username")(e);
                    }}
                />


                <TextInput
                    type={"text"}
                    placeholder={"Fullname"}
                    value={props.values.fullname}
                    onChange={(e) => {
                        setError((prev) => (prev = { ...prev, fullname: undefined }));
                        props.handleInputChange("fullname")(e);
                    }}
                />

                <div className='flex flex-col gap-6 my-4'>
                    <Button
                        direction="right"
                        disabled={!props.values.username && !props.values.fullname}
                        className={"text-xs py-4 w-full"}
                        onClick={Continue}
                    >
                        Continue
                    </Button>
                    <ButtonLink type='button' icon={<ArrowLeftIcon className='w-4 h-4' />} onClick={Previous} underline_style='expanded' >Back to email</ButtonLink>
                </div>
            </div>
        </form>
    )
}

const usePersonalDetailsHandler = (props: Props) => {
    let [error, setError] = useState<Partial<ErrorType>>()
    let Continue = (e: React.MouseEvent) => {
        e.preventDefault();
        if (props.values.username.length < 1)
            return setError(
                (prev) => (prev = { ...prev, username: "Username is required" })
            );
        if (props.values.fullname.length < 1)
            return setError(
                (prev) => (prev = { ...prev, fullname: "Fullname is required" })
            );
        if (props.values.username.length < 5)
            return setError(
                (prev) =>
                (prev = {
                    ...prev,
                    username: `Unable to validate username: ${props.values.username}. Please try again.`,
                })
            );
        if (props.values.fullname.length < 6)
            return setError(
                (prev) =>
                (prev = {
                    ...prev,
                    fullname: `Unable to validate fullname: ${props.values.fullname}. Please try again.`,
                })
            );

        setError((prev) => (prev = { username: undefined, fullname: undefined }));
        props.nextStep();
    };
    let Previous = (e: React.MouseEvent) => {
        e.preventDefault();
        props.prevStep();
    };

    return { error, setError, Continue, Previous }
}

export default PersonalDetails
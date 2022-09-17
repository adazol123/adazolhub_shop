import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { fetchSignInMethodsForEmail } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { MouseEvent, useState } from 'react'
import { auth } from '../../../../app/auth/firebase'
import { StepperProps, StepperValue } from '../../../../utils/type/types'
import Button from '../../../ui/buttons/Button'
import ButtonLink from '../../../ui/buttons/ButtonLink'
import ErrorInfoWrapper from '../../../ui/error/ErrorInfoWrapper'
import TextInput from '../../../ui/input/TextInput'

type Props = Omit<StepperProps<Omit<StepperValue, 'step'>>, 'prevStep' | 'setStepper'>

let regexValidator = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g


const EmailDetails = (props: Props) => {
    const router = useRouter()

    const { error, setError, Continue } = useEmailFormHandler(props)
    console.log(!regexValidator.test(props.values.email))
    return (
        <form>
            <div className="flex flex-col gap-3">
                {error && <ErrorInfoWrapper error={error} />}
                <TextInput
                    type='email'
                    placeholder='Email'
                    value={props.values.email}
                    required
                    onChange={(event) => {
                        setError(null)
                        props.handleInputChange('email')(event)
                    }}
                />
                <Button
                    disabled={!(props.values.email.match(regexValidator))}
                    onClick={Continue}
                >
                    Continue
                </Button>
                <ButtonLink
                    type='button'
                    size='small'
                    icon={<ArrowLeftIcon />}
                    onClick={() => router.back()}
                    underline_style='expanded'
                >
                    Other signup options
                </ButtonLink>
            </div>
        </form>
    )
}

const useEmailFormHandler = (props: Props) => {
    const router = useRouter()

    let [error, setError] = useState<string | null | HTMLElement | JSX.Element>(
        null
    );
    const Continue = (event: MouseEvent) => {
        event.preventDefault()

        if (props.values.email.length < 1) return setError('A valid email is required to continue.')

        /**
         * format validation checker with regex
         */
        if (regexValidator.test(props.values.email)) {
            setTimeout(async () => {
                try {
                    /**
                     * Firebase auth to check if email is already registered
                     */
                    let emailExist = await fetchSignInMethodsForEmail(auth, props.values.email)
                    if (emailExist.length > 0) {
                        return setError(
                            <>
                                <span>
                                    Email already registered on our server. {" "}
                                    <strong
                                        className="underline cursor-pointer text-gray-40 w-fit "
                                        onClick={() => router.replace("/login")}
                                    >
                                        Try login
                                    </strong>
                                </span>
                            </>
                        );
                    }
                    setError(null)
                    return props.nextStep()

                } catch (error: any) {
                    // if (error.code === "auth/invalid-email") {
                    //     return setError("Invalid email format. Please try again");
                    // }
                    // else {
                    // }
                    return setError(error.message)
                }
            }, 300)
        }
        else {
            setError("Invalid email format. Please try again");
        }
    }
    return { error, setError, Continue }
}

export default EmailDetails
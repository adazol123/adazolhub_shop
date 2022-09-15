import { ArrowLeftIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { MouseEventHandler, useState } from 'react'
import { auth, db } from '../../../../app/auth/firebase';
import { StepperProps, StepperValue } from '../../../../utils/type/types';
import Button from '../../../ui/buttons/Button';
import ButtonLink from '../../../ui/buttons/ButtonLink';
import TextInput from '../../../ui/input/TextInput';

type Props = Omit<StepperProps<Omit<StepperValue, 'step'>>, 'nextStep'>
type ErrorType = {
    password: string,
    confirm_password: string
}
//Password regex format
let lowerCaseLetters = /[a-z]/g;
let upperCaseLetters = /[A-Z]/g;
let number = /\d/g;


const SecurityDetails = (props: Props) => {
    const { error, setError, isInvalid, isLoading, Continue, Previous } = useFormValidator(props)
    return (
        <form className="flex flex-col gap-8">
            <div className='flex flex-col gap-3'>
                {/* <PasswordRequirementInfo
            passLength={values?.password.length < 9}
            passLowerCase={!values?.password.match(lowerCaseLetters)}
            passUpperCase={!values?.password.match(upperCaseLetters)}
            passNumber={!values?.password.match(number)}
            passNotMatch={values?.password !== values?.confirm_password}
            isEmpty={!values?.password && !values?.confirm_password}
          /> */}

                <TextInput
                    type={"password"}
                    placeholder={"Password"}
                    value={props.values.password}
                    autoFocus
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onChange={(e: any) => {
                        setError((prev) => (prev = { ...prev, password: undefined }));
                        props.handleInputChange("password")(e);
                    }}
                />
                <TextInput
                    type={"password"}
                    placeholder={"Confirm Password"}
                    value={props.values.confirm_password}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"

                    onChange={(e: any) => {
                        setError((prev) => (prev = { ...prev, confirm_password: undefined }));
                        props.handleInputChange("confirm_password")(e);
                    }}
                />

                <div className='flex flex-col gap-6'>
                    <Button
                        direction="right"
                        disabled={isInvalid}
                        className={"text-xs py-4 w-full"}
                        onClick={Continue}
                    >
                        {isLoading ? (
                            <CircleStackIcon />
                        ) : (
                            <>
                                <span>Complete Setup</span>
                            </>
                        )}
                    </Button>
                    <ButtonLink type='button' icon={<ArrowLeftIcon className='w-4 h-4' />} onClick={Previous} underline_style='expanded' >Back to Information</ButtonLink>
                </div>
            </div>
        </form>
    )
}


const useFormValidator = (props: Props) => {
    const router = useRouter()
    let [error, setError] = useState<Partial<ErrorType>>()
    let [isLoading, setLoading] = useState(false)

    //Password Validator
    let passLength = props.values?.password.length < 9;
    let passNotLower = !props.values?.password.match(lowerCaseLetters);
    let passNotUpper = !props.values?.password.match(upperCaseLetters);
    let passNotNumber = !props.values?.password.match(number);
    let passNotMatch = props.values?.password !== props.values?.confirm_password;
    let isEmpty = !props.values?.password && !props.values?.confirm_password

    const isInvalid = isEmpty || passLength || passNotLower || passNotUpper || passNotMatch

    const Continue: MouseEventHandler<Element> = (event) => {
        event.preventDefault()

        if (isEmpty)
            return setError(
                (prev: any) => (prev = { ...prev, password: "Password required" })
            );
        if (passLength)
            return setError(
                (prev: any) =>
                (prev = {
                    ...prev,
                    password: "Must contain at least 8 or more characters",
                })
            );
        if (passNotLower)
            return setError(
                (prev: any) =>
                (prev = {
                    ...prev,
                    password: "Must contain uppercase/capital characters",
                })
            );

        if (passNotUpper)
            return setError(
                (prev: any) =>
                (prev = {
                    ...prev,
                    password: "Must contain uppercase/capital characters",
                })
            );

        if (passNotNumber)
            return setError(
                (prev: any) =>
                (prev = {
                    ...prev,
                    password: "Must contain at least 1 numeric value",
                })
            );

        if (passNotMatch)
            return setError(
                (prev: any) =>
                    (prev = { ...prev, confirm_password: "Password not match" })
            );
        setLoading(true);
        setError((prev) => (prev = { password: undefined, confirm_password: undefined }));

        console.clear()
        setTimeout(async () => {
            try {
                await registrationHandler(props)
                setLoading(true);
                console.log("registration success > ");
                router.replace("/?success=true");
            } catch (error: any) {
                console.log("registration error >", error.message);
            }


        }, 3000);

    }
    const Previous: MouseEventHandler<Element> = (event) => {
        event.preventDefault();
        props.prevStep();
    };

    return { isInvalid, isLoading, error, setError, Continue, Previous }
}

const registrationHandler = async (props: Props) => {
    if (props.values.password === props.values.confirm_password) {
        try {
            let user = await createUserWithEmailAndPassword(auth, props.values.email, props.values.password)
            await updateProfile(user.user, {
                displayName: props.values.username
            })
            let profileDocRef = doc(db, `users/${user.user.uid}`)
            let paymentDocRef = doc(db, `users/${user.user.uid}/settings/payment`)
            const batch = writeBatch(db)

            batch.set(profileDocRef, {
                uid: user.user.uid,
                email: user.user.email,
                fullname: props.values.fullname.trim(),
                displayName: user.user.displayName,
                photoURL: user.user.photoURL
            }, { merge: true })
            batch.set(paymentDocRef, {
                uid: user.user.uid,
                cardNumber: [
                    '0000',
                    '0000',
                    '0000',
                    '0000'
                ],
                card_holder: props.values.fullname.trim(),
                card_type: ['VISA', "MASTER CARD", 'AMEX'],
                card_default: 'VISA',
                bank: 'BPI'
            }, { merge: true })

            /**
             * batch update for registered profile info to firestore
             */
            await batch.commit()

            /**
             * Reset temporary state form after successfully registered
             */
            props.setStepper({
                step: 1,
                email: '',
                username: '',
                fullname: '',
                password: '',
                confirm_password: '',
            })

        } catch (error: any) {
            console.log('> registration error: ', error.code)
        }


    }

}

export default SecurityDetails
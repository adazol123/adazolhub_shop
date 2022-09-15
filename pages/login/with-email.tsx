import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { auth } from '../../app/auth/firebase'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import Button from '../../components/ui/buttons/Button'
import ButtonLink from '../../components/ui/buttons/ButtonLink'
import ErrorInfoWrapper from '../../components/ui/error/ErrorInfoWrapper'
import TextInput from '../../components/ui/input/TextInput'
import Box from '../../components/ui/layouts/Box'
import Center from '../../components/ui/layouts/Center'
import { selectCurrentAuth, login } from '../../features/user/user-auth.slice'
import style from '../../styles/login.module.css'
import withoutAuthUser from '../../utils/lib/withoutAuthUser'
type Props = {}



const LoginEmail = (props: Props) => {
    const router = useRouter()
    const { tempForm, formSubmit, inputOnChange } = useFormSubmit()

    return (
        <Fragment>
            <section className={style._section}>
                <Center>
                    <Box>
                        <div className='relative w-full h-16 px-5 pointer-events-none'>
                            <Image src={'/svg/adazolhub_shop_logo_desktop_colored.svg'} alt='adazolhub_shop_logo' layout='fill' />
                        </div>

                        <form onSubmit={formSubmit} className='relative flex flex-col gap-8'>

                            <div className='relative flex flex-col gap-3'>
                                {tempForm.error && <ErrorInfoWrapper error={tempForm.error} />}

                                <TextInput type='email' value={tempForm.email} name='email' placeholder='Email' onChange={inputOnChange} />

                                <TextInput type='password' value={tempForm.password} name='password' placeholder='Password' onChange={inputOnChange} />
                            </div>
                            <div className='flex flex-col gap-6'>

                                <Button disabled={!tempForm.isFilled} >{tempForm.loading ? 'Logging in...' : "Login"}</Button>

                                <ButtonLink type='button' icon={<ArrowLeftIcon className='w-4 h-4' />} onClick={() => router.back()} underline_style='expanded' >Other login options</ButtonLink>
                            </div>
                        </form>
                        <div>
                            <ButtonLink size='small' onClick={() => router.replace('/signup')} >
                                <>
                                    Don&apos;t have an account yet?
                                    <strong>Sign up</strong>
                                </>
                            </ButtonLink>
                        </div>
                    </Box>
                </Center>
            </section>
        </Fragment>
    )
}

export const useFormSubmit = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentAuth)
    const [tempForm, setTempForm] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        isFilled: false
    })

    let resetForm = (delay = 800) => {
        setTimeout(() => {
            setTempForm({ email: '', password: '', error: '', loading: false, isFilled: false })
        }, delay)
    }
    let inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'email') {
            setTempForm({ ...tempForm, [event.target.name]: event.target.value.toLowerCase() })
        } else {
            setTempForm({ ...tempForm, [event.target.name]: event.target.value })

        }
    }
    const formSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { email, password } = tempForm;
        setTempForm({ ...tempForm, loading: true })
        try {
            if (email && password) {

                let currentAuth = await signInWithEmailAndPassword(auth, email.trim(), password.trim())
                if (currentAuth.user) {
                    dispatch(login({
                        displayName: currentAuth.user.displayName,
                        email: currentAuth.user.email,
                        emailVerified: currentAuth.user.emailVerified,
                        phoneNumber: currentAuth.user.phoneNumber,
                        photoURL: currentAuth.user.photoURL,
                        uid: currentAuth.user.uid
                    }))
                    resetForm()
                    router.replace('/?success=true')
                    console.clear()
                }
            }
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') {
                setTempForm({
                    ...tempForm,
                    password: '',
                    error: 'Password is incorrect. Please try again. If unable to remember password, you may reset your password'
                })
            } else if (error.code === 'auth/too-many-requests') {
                setTempForm({
                    ...tempForm,
                    error: 'Error communicating to our server. Please try again later.'
                })
            } else {
                setTempForm({
                    ...tempForm,
                    email: '',
                    password: '',
                    error: error.code
                })

            }

        }


    }

    useEffect(() => {
        if (tempForm.email && tempForm.password) setTempForm({ ...tempForm, error: '', isFilled: true })
        else setTempForm({ ...tempForm, isFilled: false })
    }, [tempForm.email, tempForm.password])

    return { tempForm, inputOnChange, formSubmit }
}

const EnhancedLoginEmail = withoutAuthUser(LoginEmail)
export default EnhancedLoginEmail
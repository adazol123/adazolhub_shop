import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../../components/ui/buttons/Button'
import ButtonLink from '../../components/ui/buttons/ButtonLink'
import Box from '../../components/ui/layouts/Box'
import HorizontalDivider from '../../components/ui/layouts/HorizontalDivider'
import style from '../../styles/login.module.css'
import withAuthUser from '../../utils/lib/withAuthUser'
import withoutAuthUser from '../../utils/lib/withoutAuthUser'
type Props = {}

const Signup: NextPage = () => {
    const router = useRouter()
    return (
        <section className={style._section} >
            <Head>
                <title>Adazolhub | Shop - Signup</title>
            </Head>
            <div className='mx-auto min-h-screen grid place-content-center md:min-w-[500px] gap-6'>

                <Box>
                    <div className='relative w-full h-16 px-5 pointer-events-none'>
                        <Image src={'/svg/adazolhub_shop_logo_desktop_colored.svg'} alt='adazolhub_shop_logo' layout='fill' />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Button onClick={() => router.push('/signup/with-email')} icon={<EnvelopeIcon />} type='button' > Continue with Email</Button>
                        <HorizontalDivider />
                        <Button styled='outline' >Continue with Google</Button>
                        <div>
                            <p className='max-w-[200px] text-[0.65rem] text-theme-gray-500'>By clicking continue, you agree to our <strong className='underline text-theme-gray-700/70 underline-offset-2'>Terms and Conditions</strong> and <strong className='underline text-theme-gray-700/70 underline-offset-2'>Privacy Policy</strong></p>
                        </div>
                    </div>
                    {/*
                        <form className='flex flex-col gap-4'>
                            <TextInput type='email' placeholder='Email' />
                            <TextInput type='password' placeholder='Password' />
                        </form> */}
                    <div>
                        <ButtonLink size='small' onClick={() => router.replace('/login')} >
                            <>
                                Already have an account?
                                <strong>Login</strong>
                            </>
                        </ButtonLink>
                    </div>
                </Box>

            </div>
        </section>
    )
}
const EnhanceSignup = withoutAuthUser(Signup, { withFallbackURL: '/' })

export default EnhanceSignup
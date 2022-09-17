import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import StepperForm from '../../components/form/signup/StepperForm'
import ButtonLink from '../../components/ui/buttons/ButtonLink'
import Box from '../../components/ui/layouts/Box'
import Center from '../../components/ui/layouts/Center'
import style from '../../styles/login.module.css'
import withoutAuthUser from '../../utils/lib/withoutAuthUser'

type Props = {}

const SignupEmail: NextPage = (props: Props) => {

    const router = useRouter()
    if (router.query.success === 'true') return <OnBoarding />
    return (
        <section className={style._section}>
            <Center>
                <Box>

                    <StepperForm />

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
    )
}
export const OnBoarding: FC = () => {
    return (
        <section>
            <Center>
                Sucess!
            </Center>
        </section>
    )
}

const EnhancedSignupEmail = withoutAuthUser(SignupEmail, { withFallbackURL: '/signup/with-email/?success=true' })

export default EnhancedSignupEmail
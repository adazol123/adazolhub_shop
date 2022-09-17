import { sendEmailVerification } from 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { auth } from '../../app/auth/firebase'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import Button from '../../components/ui/buttons/Button'
import RootLoader from '../../components/ui/loader/RootLoader'
import { logout, selectCurrentAuth } from '../../features/user/user-auth.slice'
import withAuthUser from '../../utils/lib/withAuthUser'

type Props = {}

const Account: NextPage = () => {
    const user = useAppSelector(selectCurrentAuth)
    const dispatch = useAppDispatch()
    const router = useRouter()
    if (!user) {
        router.replace('/')
        return null
    }
    return (
        <section>
            Account
            <h2>{user.displayName}</h2>
            <br />
            <span>{user.email}</span>
            <br />
            <span>{user.uid}</span>
            <br />
            <span>{user.emailVerified.toString()}</span>
            <div>
                <Button onClick={async () => {
                    if (auth.currentUser) {
                        await sendEmailVerification(auth.currentUser)

                    }
                }}>Verify</Button>
                <Button onClick={async () => {
                    await auth.signOut()
                    dispatch(logout())
                }}>Logout</Button>
            </div>
        </section>
    )
}

const Secured = withAuthUser(Account, { withFallbackURL: '/login' })

export default Secured
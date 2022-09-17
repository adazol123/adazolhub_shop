import { deleteUser, sendEmailVerification } from 'firebase/auth'
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
            <h3>{user.displayName}</h3>
            <br />
            <span>{user.email}</span>
            <br />
            <span>{user.uid}</span>
            <br />
            <span>{user.emailVerified.toString()}</span>
            <div>
                <Button
                    disabled={user.emailVerified}
                    onClick={async () => {
                        if (auth.currentUser && auth.currentUser.emailVerified === false) {

                            await sendEmailVerification(auth.currentUser)

                        } else {
                            console.log('email alread verified')
                        }
                    }}>Verify</Button>
                <Button onClick={async () => {
                    await auth.signOut()
                    dispatch(logout())
                }}>Logout</Button>
                <Button onClick={async () => {
                    if (auth.currentUser) {

                        await deleteUser(auth.currentUser)
                        dispatch(logout())
                    }
                }}
                    className='bg-rose-600/10 text-rose-600'
                >Delete Account</Button>
            </div>
        </section>
    )
}

const Secured = withAuthUser(Account, { withFallbackURL: '/login' })

export default Secured
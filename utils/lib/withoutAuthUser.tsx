import { useRouter } from 'next/router'
import React, { ComponentType, ReactNode } from 'react'
import RootLoader from '../../components/ui/loader/RootLoader'
import { fetchAuthUser } from '../../features/user/user-auth.slice'
import { useFetcher } from '../../hooks/useFetcher'
import { UserType } from '../type/types'

type Props = {}

const withoutAuthUser = <T extends {
    children: ReactNode | undefined,
    user: UserType | null
}, F extends {
    withFallbackURL: string
}>(WrappedComponent: ComponentType<T>, options?: F) => {
    let Comp = (props: T) => {
        const router = useRouter()
        console.log(options)
        const { status, result: state, error } = useFetcher('auth', fetchAuthUser(), 'user')

        React.useEffect(() => {
            console.log(status)
            if (status === 'succeeded' && state) {
                router.push(options?.withFallbackURL || '/')
                return
            }
            else {
                console.log(error)
            }
        }, [status])


        return status === 'loading' || status === 'idle' ? <RootLoader /> : <WrappedComponent {...props} user={state} />
    }
    return Comp
}

export default withoutAuthUser
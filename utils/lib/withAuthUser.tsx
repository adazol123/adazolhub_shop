import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { ComponentType, PropsWithChildren, ReactNode, useState } from 'react';
import { auth } from '../../app/auth/firebase';
import { useAppSelector } from '../../app/redux/hook';
import RootLoader from '../../components/ui/loader/RootLoader';
import { fetchAuthUser, selectCurrentAuth } from '../../features/user/user-auth.slice';
import { useFetcher } from '../../hooks/useFetcher';
import { UserType } from '../type/types';


const withAuthUser = <T extends {
    children: ReactNode | undefined,
    user: UserType | null
}, F extends {
    withFallbackURL: string
}>(WrappedComponent: ComponentType<T>, options?: F) => {
    let Comp = (props: T) => {
        const router = useRouter()
        console.log(options)
        const { status, state, error } = useFetcher('auth', fetchAuthUser(), 'user')

        React.useEffect(() => {
            console.log(status)
            if (status === 'failed' && !state) router.push(options?.withFallbackURL || '/login')
            if (error) console.log(error)
        }, [status])

        return status === 'loading' || status === 'idle' ? <RootLoader /> : <WrappedComponent {...props} user={state} />
    }
    return Comp
}

export default withAuthUser
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { ComponentType, PropsWithChildren, ReactNode, useState } from 'react';
import { auth } from '../../app/auth/firebase';
import { useAppSelector } from '../../app/redux/hook';
import RootLoader from '../../components/ui/loader/RootLoader';
import { fetchAuthUser, selectCurrentAuth } from '../../features/user/user-auth.slice';
import { useFetcher } from '../../hooks/useFetcher';


const withAuthUser = <T extends PropsWithChildren, F extends {
    withFallbackURL?: string
}>(WrappedComponent: ComponentType<T>, options: F) => {
    let Comp = (props: T) => {
        const router = useRouter()
        console.log(options)
        const { status, state, error } = useFetcher('auth', fetchAuthUser(), 'user')

        React.useEffect(() => {
            console.log(status)
            if (status === 'succeeded' && !state) router.push(options.withFallbackURL || '/login')
        }, [status])

        if (error) return <div>{JSON.stringify(error, null, 2)}</div>
        return status === 'loading' || status === 'idle' ? <RootLoader /> : <WrappedComponent {...props} />
    }
    return Comp
}

export default withAuthUser
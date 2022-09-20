import { AsyncThunkAction } from '@reduxjs/toolkit'
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'
import React, { FC, Fragment, PropsWithChildren, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/redux/hook'
import { RootState } from '../app/redux/store'
import { AsyncStatus, UserProps } from '../utils/type/types'

type SelectedType<X extends keyof RootState> = keyof Omit<RootState[X], 'status' | 'error'>
/**
 * Async Redux Fetcher
 * 
 * @param store redux store reference
 * @param fetcher dispatcher for redux async thunk created on your slice
 * @param options access to state inside store (if available)
 * @returns an object of {state, status and error}
 * 
 * @example
 * let { state, status, error } = useFetcher('auth', fetchAuthUser(), 'user')
 * 
 */
type StoreType = keyof Omit<RootState, 'toggle'>

export const useFetcher = <
    S extends StoreType,
    F,
    Z extends SelectedType<S>>(
        store: S,
        fetcher: AsyncThunkAction<F, void, {}>,
        options: Z) => {
    const data = useAppSelector(state => state[store])
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (data.status && data.status === 'idle') {
            dispatch(fetcher)
        }
        // return () => {
        //     dispatch(fetcher)
        // }
    }, [data.status])
    // let result = options && state[options]
    // if (!options) return state

    return { result: data[options], status: data.status, error: data.error }
    // else return state
}
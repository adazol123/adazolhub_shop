import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { RootState, AppDispatch } from "./store";

/**
 * (Alias) redux __useDispatch__ hook which strictly typed version
 *
 *
 * A hook to access the redux `dispatch` function.
 *
 * @returns redux store's dispatch function
 *
 * @example
 * import React from 'react'
 * import { useAppDispatch } from '../app/hook'
 *
 * export const CounterComponent = ({ value }) => {
 *      const dispatch = useAppDispatch()
 *      const increaseCounter = useCallback(() => dispatch({
 *          type: 'increase-counter'
 *      }), [])
 *
 *      return (
 *          <div>
 *              <span>{value}</span>
 *              <button onClick={increaseCounter}>Increase counter</button>
 *          </div>
 *      )
 * }
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * (Alias) redux __useSelector__ hook which strictly typed version
 *
 *
 * A typed hook to access the redux `store's state`. This hook takes a `selector` function as an argument. The selector is called with the store state.
 *
 * @param selector the selector function
 *
 * @returns — the selected state
 * @example
 * import React from 'react'
 * import { useAppSelector } from '../app/hook'
 *
 * export const CounterComponent = () => {
 *      const counter = useAppSelector(state => state.counter)
 *          return <div>{counter}</div>
 * }
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
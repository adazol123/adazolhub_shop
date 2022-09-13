import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/redux/store'
import { fetchAuthUser, selectCurrentAuth } from '../features/user/user-auth.slice'
import { useAppSelector } from '../app/redux/hook'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

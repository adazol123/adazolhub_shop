import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth } from '../app/auth/firebase'
import { useAppDispatch, useAppSelector } from '../app/redux/hook'
import Button from '../components/ui/buttons/Button'
import RootLoader from '../components/ui/loader/RootLoader'
import { fetchAuthUser, logout, selectCurrentAuth } from '../features/user/user-auth.slice'
import { useFetcher } from '../hooks/useFetcher'
import styles from '../styles/Home.module.css'
import withAuthUser from '../utils/lib/withAuthUser'

const Home: NextPage = () => {
  let user = useAppSelector(selectCurrentAuth)
  // console.log(state, status)
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Adazolhub | Shop</title>

      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Button onClick={() => {
          router.push('/account')
        }} >
          {user ? 'My Account' : 'Getting Started'}
        </Button>

      </main>

    </div>
  )
}

export default Home

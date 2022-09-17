import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/redux/hook'
import { fetchAuthUser, selectCurrentAuth } from '../features/user/user-auth.slice'
import { useFetcher } from '../hooks/useFetcher'
import styles from '../styles/Home.module.css'
import withAuthUser from '../utils/lib/withAuthUser'

const Home: NextPage = () => {
  // let { state, status } = useFetcher('auth', fetchAuthUser(), 'user')
  // console.log(state, status)
  const user = useAppSelector(selectCurrentAuth)
  return (
    <div className={styles.container}>
      <Head>
        <title>Adazolhub | Shop</title>

      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>
          {user?.displayName}
        </p>
        <p>
          {user?.email}
        </p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

const WithUser = withAuthUser(Home, { withFallbackURL: '/login' })

export default WithUser

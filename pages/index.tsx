import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { auth } from '../app/auth/firebase'
import { useAppDispatch, useAppSelector } from '../app/redux/hook'
import Button from '../components/ui/buttons/Button'
import CategoryCard from '../components/ui/cards/Category'
import RootLoader from '../components/ui/loader/RootLoader'
import { fetchAuthUser, logout, selectCurrentAuth } from '../features/user/user-auth.slice'
import { useFetcher } from '../hooks/useFetcher'
import styles from '../styles/Home.module.css'
import withAuthUser from '../utils/lib/withAuthUser'

const Home: NextPage = () => {
  let user = useAppSelector(selectCurrentAuth)
  console.log(user)
  const router = useRouter()
  return (
    <Fragment>
      <Head>
        <title>Adazolhub | Shop</title>

      </Head>
      <section className='space-y-md pt-md'>
        <div>

          <h2>Explore Brands</h2>
          <p className="max-w-[30ch]">Explore authentic brands right at your fingertips</p>
        </div>
        <div>
          <h4>Categories</h4>
          <div className='w-full overflow-hidden overflow-x-auto scroll-smooth'>
            <div className='flex gap-4 w-fit py-2'>
              <CategoryCard
                img_source='https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop'
                label='Men'
              />
              <CategoryCard
                img_source='https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop'
                label='Women'
              />
              <CategoryCard
                img_source='https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop'
                label='Kids'
              />
            </div>
          </div>
        </div>
        <div>
          <h4>Products</h4>
        </div>
      </section>
    </Fragment>
  )
}

export default Home

import { ChevronLeftIcon, ChevronRightIcon, TruckIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { auth } from '../app/auth/firebase'
import { useAppDispatch, useAppSelector } from '../app/redux/hook'
import Footer from '../components/footer'
import Button from '../components/ui/buttons/Button'
import CategoryCard from '../components/ui/cards/Category'
import FeatureCard from '../components/ui/cards/feature'
import InformationCard from '../components/ui/cards/information'
import ProductCard from '../components/ui/cards/product'
import Bleed from '../components/ui/layouts/Bleed'
import RootLoader from '../components/ui/loader/RootLoader'
import DefaultModal from '../components/ui/modals/default'
import { getProducts, selectAppProducts } from '../features/shop/product-slice'
import ProductGridList from '../features/shop/ProductGridList'
import { toggleState } from '../features/toggle/toggle.slice'
import { fetchAuthUser, logout, selectCurrentAuth } from '../features/user/user-auth.slice'
import { useFetcher } from '../hooks/useFetcher'
import styles from '../styles/Home.module.css'
import withAuthUser from '../utils/lib/withAuthUser'
import { ProductItemProps } from './../utils/type/types';

const Home: NextPage = () => {
  let user = useAppSelector(selectCurrentAuth)
  const { result } = useFetcher('shop', getProducts(), 'products')

  const router = useRouter()
  return (
    <Fragment>
      <Head>
        <title>Adazolhub | Shop</title>

      </Head>
      <section className='space-y-md pt-md min-h-screen'>
        <div>

          <h2>Explore Brands</h2>
          <p className="max-w-[30ch]">Explore authentic brands right at your fingertips</p>
        </div>
        <div>
          <h4>Categories</h4>
          <div className='w-full overflow-hidden overflow-x-auto scroll-smooth'>
            <div className='flex gap-4 w-fit py-3'>
              <CategoryCard
                img_source='https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=50'
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
          <ProductGridList />
        </div>

        <Bleed className='bg-gradient-to-br from-marine-500 to-marine-900'>
          <div className='container mx-auto flex flex-wrap gap-6 justify-center'>

            <InformationCard
              icon={<TruckIcon />}
              title='Free Delivery'
              label='Enjoy free delivery and 28-days returns on all orders.'
            />
            <InformationCard
              icon={<TruckIcon />}
              title='Free Delivery'
              label='Enjoy free delivery and 28-days returns on all orders.'
            />
            <InformationCard
              icon={<TruckIcon />}
              title='Free Delivery'
              label='Enjoy free delivery and 28-days returns on all orders.'
            />
            <InformationCard
              icon={<TruckIcon />}
              title='Free Delivery'
              label='Enjoy free delivery and 28-days returns on all orders.'
            />
          </div>
        </Bleed>
        <div>
          <div className='flex justify-between'>

            <h4>You might also like</h4>
            <div>
              <button><ChevronLeftIcon /></button>
              <button><ChevronRightIcon /></button>

            </div>
          </div>
          <div className='w-full overflow-hidden overflow-x-auto scroll-smooth'>
            <div className='flex gap-4 w-fit py-3'>
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
            </div>
          </div>
        </div>
      </section>
      <Bleed className='bg-neutral-800 text-white'>
        <Footer />
      </Bleed>

    </Fragment>
  )
}

export default Home

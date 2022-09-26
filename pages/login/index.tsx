import { ArrowLeftIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { auth } from '../../app/auth/firebase'
import Button from '../../components/ui/buttons/Button'
import ButtonLink from '../../components/ui/buttons/ButtonLink'
import Box from '../../components/ui/layouts/Box'
import HorizontalDivider from '../../components/ui/layouts/HorizontalDivider'
import style from '../../styles/login.module.css'
import withoutAuthUser from '../../utils/lib/withoutAuthUser'

type Props = {}

const Login = (props: Props) => {
  const router = useRouter()
  return (
    <Fragment>
      <Head>
        <title>Login - Adazolhub | Shop</title>
      </Head>
      <section className={style._section}>

        <Box>
          <button className='w-fit relative -left-3 flex gap-1 px-3 py-3 self-start rounded-full text-tiny hover:bg-theme-gray-100 text-theme-gray-700' onClick={() => router.back()}>
            <ArrowLeftIcon />
          </button>
          <div>
            <div className='relative w-full h-16 px-5 '
              onClick={() => router.replace('/')}
            >
              <Image src={'/svg/adazolhub_shop_logo_desktop_colored.svg'} alt='adazolhub_shop_logo' layout='fill' className='pointer-events-none' />
            </div>
            <div className='flex flex-col gap-4 mt-10'>
              <Button type='button' onClick={() => router.push('/login/with-email')} > Continue with Email</Button>
              <HorizontalDivider />
              <Button styled='outline' className='text-theme-gray-700 border-theme-gray-500' onClick={async () => {
                try {
                  await signInWithPopup(auth, new GoogleAuthProvider())
                  console.log('login via provider')
                } catch (error: any) {
                  console.log(error.code)
                  return
                }
              }} >Continue with Google</Button>
            </div>
          </div>

          <div>
            <ButtonLink size='small' className='text-theme-gray-500' onClick={() => router.replace('/signup')}  >
              <>
                Don&apos;t have an account yet?
                <strong>Sign up</strong>
              </>
            </ButtonLink>
          </div>
        </Box>

      </section>
    </Fragment>
  )
}

const EnhancedLogin = withoutAuthUser(Login)
export default EnhancedLogin
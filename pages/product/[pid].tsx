import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import HeaderNavProduct from '../../components/header/Product'
import RootLoader from '../../components/ui/loader/RootLoader'
import { ProductItemProps } from '../../utils/type/types';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import Button from '../../components/ui/buttons/Button'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart, updatePrice } from '../../features/cart/cart.slice'
import { useFetcher } from '../../hooks/useFetcher'
import { getProducts } from '../../features/shop/product-slice'

type Props = {}

const ProductDetails: NextPage = (props) => {
  const { result, status } = useFetcher('shop', getProducts(), 'products')
  const router = useRouter()
  let { pid } = router.query
  let product = useAppSelector(state => state.shop.products.find(item => item.product_id === pid))
  if (!product) {
  }
  React.useEffect(() => {
    const observe = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // let header = document.querySelector('#product-header')
        // let detail = document.querySelector('#product-detail')
        // if (entry.isIntersecting) {
        //   console.log('intersecting ')
        //   header?.classList.replace('bg-white', 'bg-transparent')
        //   header?.classList.replace('text-theme-gray-700', 'text-white')
        //   detail?.classList.add('hidden')
        //   header?.classList.remove('shadow')
        // } else {
        //   console.log('outgoing')
        //   header?.classList.replace('bg-transparent', 'bg-white')
        //   header?.classList.replace('text-white', 'text-theme-gray-700')
        //   detail?.classList.remove('hidden')
        //   header?.classList.add('shadow')
        // }
      })
    }, {
      rootMargin: '-20px'
    })

    // let para = document.querySelectorAll('.intersection')
    // para.forEach(par => {
    //   observe.observe(par)
    // })
    // return () => {
    //   para.forEach(par => {
    //     observe.unobserve(par)
    //   })
    // }

  }, [])
  const carts = useAppSelector(state => state.cart.carts)
  let cart = carts.find(cart => cart.product_id === pid)
  let [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()


  return (
    <Fragment>
      {status === 'succeeded' && product ?
        <Fragment>
          <HeaderNavProduct product={product} />

          <div >
            <figure className='intersection relative w-full min-h-[60vh]'>
              <Image src={product?.metatags.images[0].url} layout='fill' alt='' objectFit='cover' />
            </figure>
            <section >
              <h3>{product.name}</h3>
              <h4>P {product.price.toFixed(2)}</h4>
            </section>
            <section>
              <div className='flex flex-col gap-2'>
                {/* <h4>Variants</h4> */}
                <div>
                  <span className='mr-1 font-semibold'>Color</span>
                  {/* <span className='opacity-75'>Blue</span> */}
                  <div className="flex gap-4 m-2">
                    {Object.values(product.metatags.variants).map((variant, _index) => {
                      let color = `rounded-full p-2 `
                      return (
                        <button key={_index}
                          title={variant.name}
                          className={`${color} w-6 h-6 opacity-50 hover:opacity-90 ring-2 ring-neutral-200 ring-offset-2`}
                          style={{
                            backgroundColor: variant.name
                          }}
                        >
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <span className='mr-1 font-semibold'>Size</span>
                  {/* <span className='opacity-75'>Blue</span> */}
                  <div className="flex gap-2 mt-1 mb-2">
                    {product.metatags.sizes.map((size, _index) => {
                      let shortenSize = () => {
                        switch (size) {
                          case 'extra-small':
                            return 'XS'
                          case 'small':
                            return 'S'
                          case 'medium':
                            return 'M'
                          case 'large':
                            return 'L'
                          case 'extra-large':
                            return 'XL'
                          default:
                            return 'Free Size'
                        }
                      }
                      return (
                        <button key={_index}
                          title={size}
                          className='p-2 rounded-full border min-w-[34px] flex justify-center items-center hover:bg-theme-dark hover:text-theme-light'>
                          <span className='font-semibold text-tiny'>{shortenSize()}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <p>{product.description}</p>
            </section>
            {/* <div className={`flex gap-2 relative bg-gradient-to-br from-white to-marine-100 py-3 px-6 -mx-6  w-[calc(100%+3rem)] rounded-b-xl ${cart ? 'justify-end' : ' justify-between'}`}>
              <div className={`flex items-center gap-1 ${cart && 'hidden'}`}>
                <button className='p-2 border rounded-full disabled:opacity-50 disabled:bg-theme-gray-100'
                  disabled={quantity < 2}
                  onClick={() => {
                    if (cart) {
                      dispatch(decrementQuantity(product?.product_id))
                    } else {
                      if (quantity > 1) {
                        setQuantity(prev => prev -= 1)
                      }
                    }
                  }}
                ><MinusIcon /></button>
                <h3 className='text-marine-700 min-w-[2ch] text-center'>{cart ? cart.quantity : quantity}</h3>
                <button className='p-2 border rounded-full disabled:opacity-50 disabled:bg-theme-gray-100'
                  disabled={quantity >= 20}
                  onClick={() => {
                    if (cart) {
                      dispatch(incrementQuantity(product?.product_id))
                    } else {
                      setQuantity(prev => prev += 1)
                    }
                  }}
                ><PlusIcon /></button>
              </div>
              <div className='flex gap-2'>
                {!cart ? <div className='flex flex-col items-end'>
                  <span className='opacity-50'>Estimated Price</span>
                  <p><strong>₱ {(product.price * quantity).toFixed(2)}</strong></p>
                </div> :
                  <div className='flex flex-col items-end'>
                    <span className='opacity-50'>Current Price</span>
                    <p><strong>₱ {(product.price).toFixed(2)} x {cart.quantity}</strong></p>
                  </div>}
                {!cart ? <Button className='rounded-full'
                  onClick={() => {
                    if (product) {
                      dispatch(addToCart({
                        product_id: product?.product_id,
                        color: 'black',
                        name: product?.name,
                        price: product?.price,
                        quantity: quantity,
                        size: 'small',
                        product: product
                      }))
                      setQuantity(1)
                      dispatch(updatePrice())
                    }
                  }}
                >Add to Cart</Button> :
                  <Button className='rounded-full'
                    onClick={() => {
                      setQuantity(1)
                      dispatch(removeFromCart(cart?.product_id))
                    }}
                  >Remove from Cart</Button>
                }
              </div>
            </div> */}
          </div>

        </Fragment>
        :
        <RootLoader />
      }
    </Fragment>
  )
}


export async function getServerSideProps() {
  return {
    props: {
      data: 'hello'
    }
  }
}
export default ProductDetails
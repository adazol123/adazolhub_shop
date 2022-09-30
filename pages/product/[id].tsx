import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../app/redux/hook'
import HeaderNavProduct from '../../components/header/Product'
import RootLoader from '../../components/ui/loader/RootLoader'
import { ProductItemProps } from './../../utils/type/types';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

type Props = {}

const ProductDetails: NextPage = (props: Props) => {
  const router = useRouter()
  let { id } = router.query
  const [ref, { top }] = useMeasure({ polyfill: IntersectionObserver })
  let product = useAppSelector(state => state.shop.products.find(item => item.product_id === id))
  React.useEffect(() => {
    console.log(top)

  }, [top])

  return (
    <Fragment>
      <HeaderNavProduct product={product as ProductItemProps} />
      {product ? (
        <div >
          <figure className='relative w-full min-h-[60vh]'>

            <Image src={product?.metatags.images[0].url} layout='fill' alt='' objectFit='cover' />
          </figure>
          <section ref={ref}>
            <h3>{product.name}</h3>
            <h4>P {product.price.toFixed(2)}</h4>
          </section>
          <section>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
            <p>{product.description}</p>
          </section>
        </div>) :
        <RootLoader />
      }
    </Fragment>
  )
}

export default ProductDetails
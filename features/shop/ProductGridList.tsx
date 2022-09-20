import React from 'react'
import ProductCard from '../../components/ui/cards/product'
import ProductSkeleton from '../../components/ui/skeleton/products'
import { useFetcher } from '../../hooks/useFetcher'
import { getProducts } from './product-slice'

type Props = {}

const ProductGridList = (props: Props) => {
    const { result, status } = useFetcher('shop', getProducts(), 'products')

    return (
        <div>
            <h4>Products</h4>
            {status === 'idle' || status === 'loading' ? <ProductSkeleton /> : <div className='flex flex-wrap w-full gap-4 py-3 '>
                {result.map(product => (
                    <ProductCard key={product.product_id} tag='New' product={product} />
                ))}
            </div>}
        </div>
    )
}

export default ProductGridList
import { MinusIcon, PlusIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import Button from '../../components/ui/buttons/Button'
import ProductCard from '../../components/ui/cards/product'
import DefaultModal from '../../components/ui/modals/default'
import ProductSkeleton from '../../components/ui/skeleton/products'
import { useFetcher } from '../../hooks/useFetcher'
import { ProductItemProps } from '../../utils/type/types'
import { toggleState } from '../toggle/toggle.slice'
import { getProducts } from './product-slice'

type Props = {}

const ProductGridList = (props: Props) => {
    const { result, status } = useFetcher('shop', getProducts(), 'products')
    const { mobile } = useAppSelector(state => state.toggle.toggle)
    let [selectedItem, setSelectedItem] = useState<ProductItemProps>()
    const dispatch = useAppDispatch()
    return (
        <div>
            <h4>Products</h4>
            {status === 'idle' || status === 'loading' ? <ProductSkeleton /> : <div className='flex flex-wrap w-full gap-4 py-3 '>
                {result.map(product => (
                    <ProductCard
                        key={product.product_id}
                        tag='New'
                        product={product}
                        onImageClick={() => {
                            dispatch(toggleState('mobile'))
                            setSelectedItem(product)
                        }}
                    />
                ))}
                {selectedItem &&
                    <DefaultModal toggle={mobile} toggleHandler={() => dispatch(toggleState('mobile'))}  >
                        <div className="w-full">


                            <div
                                className='relative w-44 h-44 rounded-lg overflow-hidden'
                            >

                                <Image
                                    src={selectedItem.metatags.images[0].url}
                                    alt={selectedItem.name}
                                    layout='fill'
                                    objectFit='cover'
                                    width={40}
                                />
                            </div>
                            <div className='w-[calc(50%)]'>
                                <h4>{selectedItem.name.slice(0, 40)}</h4>
                                <h3>₱ {selectedItem.price.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className='w-full flex justify-between'>
                            <div />
                            <div className="flex gap-4">
                                <div className='flex gap-3 items-center'>
                                    <button className='p-1 bg-marine-300 rounded'><MinusIcon /></button>
                                    <h4>2</h4>
                                    <button className='p-1 bg-marine-300 rounded'><PlusIcon /></button>
                                </div>
                                <Button className='w-'>Add to cart</Button>
                            </div>
                        </div>
                    </DefaultModal>}
            </div>}
        </div >
    )
}

export default ProductGridList
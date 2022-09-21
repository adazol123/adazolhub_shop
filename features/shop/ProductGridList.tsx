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
                        <div className="flex flex-col gap-6">
                            <div className="w-full flex gap-3">
                                <div
                                    className='relative  w-[calc(50%-0.5rem)] h-44 rounded-lg overflow-hidden'
                                >
                                    <Image
                                        src={selectedItem.metatags.images[0].url}
                                        alt={selectedItem.name}
                                        objectFit='cover'
                                        layout='fill'
                                    />
                                </div>
                                <div className='w-[calc(50%)] flex flex-col justify-between'>
                                    <div>

                                        <h3 className='line-clamp-3'>{selectedItem.name.slice(0, 40)}</h3>
                                        <h4>₱ {selectedItem.price.toFixed(2)}</h4>
                                    </div>
                                    <Button styled='outline' size='medium' className='rounded-full'>Details</Button>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h4>Variants</h4>
                                <div>
                                    <span className='mr-1 font-semibold'>Color</span>
                                    {/* <span className='opacity-75'>Blue</span> */}
                                    <div className="flex gap-2">

                                        {Object.values(selectedItem.metatags.variants).map((variant, _index) => {
                                            let color = ` rounded-full p-2`
                                            return (
                                                <div key={_index} className={`${color} w-10 h-10 opacity-50`}
                                                    style={{
                                                        backgroundColor: variant.name
                                                    }}
                                                >

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <span className='mr-1 font-semibold'>Size</span>
                                    {/* <span className='opacity-75'>Blue</span> */}
                                    <div className="flex gap-2">

                                        {selectedItem.metatags.sizes.map((size, _index) => {
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
                                                <div key={_index} className='p-2 rounded-full border min-w-[4ch] flex justify-center items-center'>
                                                    <span className='text-base font-semibold'>{shortenSize()}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-between'>
                                <div />
                                <div className="flex gap-4">
                                    <div className='flex gap-3 items-center'>
                                        <button className='p-3 border rounded-full'><MinusIcon /></button>
                                        <h3 className='text-marine-700'>2</h3>
                                        <button className='p-3 border rounded-full'><PlusIcon /></button>
                                    </div>
                                    <Button className='rounded-full'>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                    </DefaultModal>}
            </div>}
        </div >
    )
}

export default ProductGridList
import { MinusIcon, PlusIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/redux/hook'
import Button from '../../components/ui/buttons/Button'
import ProductCard from '../../components/ui/cards/product'
import DefaultModal from '../../components/ui/modals/default'
import ProductSkeleton from '../../components/ui/skeleton/products'
import { useFetcher } from '../../hooks/useFetcher'
import { ProductItemProps } from '../../utils/type/types'
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart, updatePrice } from '../cart/cart.slice'
import { toggleState } from '../toggle/toggle.slice'
import { getProducts } from './product-slice'

type Props = {}

const ProductGridList = (props: Props) => {
    const { result, status } = useFetcher('shop', getProducts(), 'products')
    let [selectedItem, setSelectedItem] = useState<ProductItemProps>()


    const dispatch = useAppDispatch()
    if (status === 'idle' || status === 'loading') {
        return <div>
            <h4>Products</h4>
            <ProductSkeleton />
        </div>
    }

    return (
        <Fragment>
            {result.length > 0
                ? <div>
                    <h4>Products</h4>
                    <div className='flex flex-wrap w-full gap-4 py-3 '>
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
                    </div>
                    <ProductModal selectedItem={selectedItem} />
                </div >
                : <div className='grid place-content-center place-items-center min-h-[50vh] '>
                    <h4>No Product found.</h4>

                    <span className='max-w-[30ch] text-center mt-1 opacity-50'>Please check your internet connection or Contact the support.</span>
                </div>
            }
        </Fragment>
    )
}

const ProductModal = ({ selectedItem }: { selectedItem: ProductItemProps | undefined }) => {
    const { mobile } = useAppSelector(state => state.toggle.toggle)
    const carts = useAppSelector(state => state.cart.carts)
    let cart = carts.find(cart => cart.product_id === selectedItem?.product_id)
    let [quantity, setQuantity] = useState(1)
    const dispatch = useAppDispatch()
    return (
        <Fragment>
            {selectedItem &&
                <DefaultModal toggle={mobile} toggleHandler={() => dispatch(toggleState('mobile'))}  >
                    <div className="flex flex-col gap-4">
                        <div className="flex w-full gap-3">
                            <div
                                className='relative  w-[calc(50%-0.5rem)] h-32 rounded-lg overflow-hidden'
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

                                    <h3 className='line-clamp-2 text-md'>{selectedItem.name.slice(0, 40)}</h3>
                                    <h4 className='opacity-75'>₱ {selectedItem.price.toFixed(2)}</h4>
                                </div>
                                <Button styled='outline' size='medium' className='rounded-full'>Details</Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {/* <h4>Variants</h4> */}
                            <div>
                                <span className='mr-1 font-semibold'>Color</span>
                                {/* <span className='opacity-75'>Blue</span> */}
                                <div className="flex gap-4 m-2">

                                    {Object.values(selectedItem.metatags.variants).map((variant, _index) => {
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
                                <div className="flex gap-2 my-1">

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
                        <div className=' flex justify-between relative bg-gradient-to-br from-white to-marine-100 py-3 px-6 -mx-6  w-[calc(100%+3rem)] rounded-b-xl'>

                            <div className='flex items-center gap-3'>
                                <button className='p-3 border rounded-full disabled:opacity-50 disabled:bg-theme-gray-100'
                                    disabled={quantity < 2}
                                    onClick={() => {
                                        if (cart) {

                                            dispatch(decrementQuantity(selectedItem?.product_id))

                                        } else {
                                            if (quantity > 1) {
                                                setQuantity(prev => prev -= 1)

                                            }
                                        }
                                    }}
                                ><MinusIcon /></button>
                                <h3 className='text-marine-700 min-w-[2ch] text-center'>{cart ? cart.quantity : quantity}</h3>
                                <button className='p-3 border rounded-full disabled:opacity-50 disabled:bg-theme-gray-100'
                                    disabled={quantity >= 20}
                                    onClick={() => {
                                        if (cart) {
                                            dispatch(incrementQuantity(selectedItem?.product_id))

                                        } else {
                                            setQuantity(prev => prev += 1)

                                        }
                                    }}
                                ><PlusIcon /></button>
                            </div>
                            {!cart ? <Button className='rounded-full'
                                onClick={() => {
                                    if (selectedItem) {
                                        dispatch(addToCart({
                                            product_id: selectedItem?.product_id,
                                            color: 'black',
                                            name: selectedItem?.name,
                                            price: selectedItem?.price,
                                            quantity: quantity,
                                            size: 'small',
                                            product: selectedItem
                                        }))
                                        setQuantity(1)
                                        dispatch(toggleState('mobile'))
                                        dispatch(updatePrice())

                                    }
                                }}
                            >Add to Cart</Button> :
                                <Button className='rounded-full'

                                    onClick={() => {
                                        setQuantity(1)
                                        dispatch(removeFromCart(cart?.product_id))
                                        dispatch(toggleState('mobile'))


                                    }}
                                >Remove from Cart</Button>
                            }
                        </div>
                    </div>
                </DefaultModal>}
        </Fragment>
    )
}

export default ProductGridList
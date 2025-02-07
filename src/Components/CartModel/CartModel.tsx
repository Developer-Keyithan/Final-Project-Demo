'use client'

import Image from "next/image"
import cartImage from '../../Assets/Hero.jpg'
import orangeImage from '../../Assets/Orange.jpg'

const CartModel = () => {

    const cartProducts = [
        {
            productsId: 1,
            name: 'Orange',
            quantity: 1,
            price: 80,
            image: orangeImage
        }, {
            productsId: 1,
            name: 'Chilli',
            quantity: 1,
            price: 80,
            image: cartImage
        }
    ]

    const cartItems = true
    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
            {!cartItems ? (
                <div className="">Cart is Empty</div>
            ) : (
                <>
                    <h2 className="text-xl">Shopping Cart</h2>
                    {/* LIST */}
                    <div className="flex flex-col gap-5">
                        {cartProducts.map((product, index) => (
                            <div key={index} className="flex gap-4">
                                <Image
                                    src={product.image}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-md"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    {/* TOP */}
                                    <div className="">
                                        {/* TITLE */}
                                        <div className="flex items-center justify-between gap-8">
                                            <h3 className="font-semibold">{product.name}</h3>
                                            <div className="p-1 bg-gray-50 rounded-sm">{product.price}.00 LKR</div>
                                        </div>
                                        {/* DEC */}
                                        <div className="text-sm text-gray-500">
                                            In Stock
                                        </div>
                                    </div>
                                    {/* BOTTOM */}
                                    <div className="flex justify-between text-sm mt">
                                        <div className="flex items-center mt-2">
                                            <button className="ring-1 ring-gray-300 rounded px-2 py-1 text-xl font-medium">-</button>
                                            <span className="mx-4">{product.quantity}</span>
                                            <button className="ring-1 ring-gray-300 rounded px-2 py-1 text-xl font-medium">+</button>
                                        </div>
                                        <span className="text-red-700 cursor-pointer"> Remove</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* ITEM */}
                        {/* <div className="flex gap-4">
                            <Image
                                src={orangeImage}
                                alt=""
                                width={72}
                                height={72}
                                className="object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-between w-full"> */}
                        {/* TOP */}
                        {/* <div className=""> */}
                        {/* TITLE */}
                        {/* <div className="flex items-center justify-between gap-8">
                                        <h3 className="font-semibold">Orange</h3>
                                        <div className="p-1 bg-gray-50 rounded-sm">80.00 LKR</div>
                                    </div> */}
                        {/* DEC */}
                        {/* <div className="text-sm text-gray-500">
                                        In Stock
                                    </div>
                                </div> */}
                        {/* BOTTOM */}
                        {/* <div className="flex justify-between text-sm mt">
                                    <span className="text-gray-500">Qty. 2</span>
                                    <span className="text-bgRed cursor-pointer"> Remove</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {/* BOTTOM */}
                    <div className="">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="">Subtotal</span>
                            <span className="">160.00 LKR</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">Shipping and taxes calculated at checkout.</p>
                        <div className="flex justify-between text-sm">
                            <button className="rounded-sm py-3 px-8 ring-1 ring-primaryColor hover:bg-primaryButtonHoverColor hover:text-white transition ease-in-out duration-300">View Cart</button>
                            <button className="rounded-sm py-3 px-8 bg-primaryColor hover:bg-primaryButtonHoverColor transition ease-in-out duration-300 text-white">Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartModel

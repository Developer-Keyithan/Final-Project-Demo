import './style.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsCartX } from 'react-icons/bs';
import Footer from '../../Components/Footer/Footer';
import { RiUnpinFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface CartItem {
    price: { newPrice: number };
    agricationMethod: string;
    productDescription: string;
    productName: string;
    productImages: { imageUrl: string }[];
    id: string;
    _id: string;
    productId: string;
    quantity: {
        value: number;
        unit: string;
    };
    unit: string;
}

function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const router = useRouter();
    console.log(cartItems)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchUser = await axios.get('/api/cookie');

                if (fetchUser.status === 401 || fetchUser.status === 400 || fetchUser.status === 500) {
                    setIsLoggedIn(false)
                }
                if (fetchUser.status === 200) {
                    const userId = fetchUser.data?.user?.id;
                    if (!userId) return;
                    if (userId) setIsLoggedIn(true)

                    const cartData = await axios.post('/api/cart/get-cart-by-userId', { userId });
                    setCartItems(cartData.data);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchProduct();
    }, []);

    const handleQuantityChange = (_id: string, newValue: number) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item._id === _id
                    ? {
                        ...item,
                        quantity: {
                            ...item.quantity,
                            // Check for kg and make sure the value doesn't go below 1
                            value: item.quantity.unit === 'kg'
                                ? Math.max(newValue, 1)  // Ensure value doesn't go below 1 for kg
                                : item.quantity.unit === 'g'
                                    ? Math.max(newValue, 50)  // Ensure value doesn't go below 50 for g
                                    : newValue  // For other units, no restrictions
                        }
                    }
                    : item
            )
        );
    };


    const handleUnitChange = (_id: string, newUnit: string) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item._id === _id
                    ? {
                        ...item,
                        quantity: {
                            ...item.quantity,
                            unit: newUnit,
                            value: newUnit === 'g' && item.quantity.value < 50
                                ? 50  // If changing to 'g' and value is less than 50, set it to 50
                                : item.quantity.value // Keep the current value if no adjustment is needed
                        }
                    }
                    : item
            )
        );
    };


    const handleCheckboxChange = (_id: string) => {
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = new Set(prevSelectedItems);
            if (newSelectedItems.has(_id)) {
                newSelectedItems.delete(_id);
            } else {
                newSelectedItems.add(_id);
            }
            return newSelectedItems;
        });
    };

    const handleUnpin = (_id: string) => {
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = new Set(prevSelectedItems);
            newSelectedItems.delete(_id); // Remove the item from selected items
            return newSelectedItems;
        });
    };

    const calculateProductSubtotal = (item: CartItem) => {
        const itemValue = item.quantity.unit === 'kg'
            ? item.quantity.value  // If the unit is kg, use the value directly
            : item.quantity.unit === 'g'
                ? item.quantity.value / 1000  // If the unit is grams, convert to kg
                : item.quantity.value;  // If there's another unit, use the value as it is

        return item.price.newPrice * itemValue; // Calculate the subtotal for this item
    };

    const calculateCartTotal = () => {
        return selectedItems.size === 0
            ? 0
            : cartItems
                .filter(item => selectedItems.has(item._id))
                .reduce((total, item) => {
                    const subtotal = calculateProductSubtotal(item); // Get the subtotal for the item
                    return total + subtotal;  // Add the subtotal to the total
                }, 0);
    };

    const handleRemoveCart = async (cartId: string) => {
        try {
            const response = await axios.delete('/api/cart', {
                data: { cartId }
            });

            if (response.status === 200) {
                toast.success("Item removed");
            }
            setCartItems((prevCartItems) => prevCartItems.filter(item => item._id !== cartId));
        } catch (error) {
            toast.error("Failed to remove item");
            console.error("Error removing item from cart:", error);
        }
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const handleCheckout = () => {

        const selectedItemsData = [...selectedItems].map((selectedItemId) => {
            const selectedItem = cartItems.find(item => item._id === selectedItemId);
            return selectedItem ? {
                id: selectedItem._id,
                name: selectedItem.productName,
                finalQuantity: selectedItem.quantity.value,
                unit: selectedItem.quantity.unit,
                pricePerKg: selectedItem.price.newPrice,
                agricationMethod: selectedItem.agricationMethod
            } : null;
        }).filter(item => item !== null);

        localStorage.setItem('checkoutItems', JSON.stringify(selectedItemsData));

        if (!isLoggedIn) {
            router.push('/login')
            return
        }

        if (isLoggedIn) {
            router.push('/order')
            return
        }
    };

    return (
        <div>
            <div className='sticky top-0 z-50'>
                <Navbar />
                <hr />
            </div>
            <div className='flex mx-60 my-10 gap-20'>
                <div className='flex flex-col gap-5 w-3/5 ring-1 ring-gray-300 p-4 rounded-md h-[84vh] overflow-y-auto no-scrollbar'>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((cartItem) => (
                            
                            <div key={cartItem._id} className='flex gap-5 w-full h-max'>
                                <input
                                    type="checkbox"
                                    className='accent-primaryColor h-5 w-5'
                                    onChange={() => handleCheckboxChange(cartItem._id)}
                                    checked={selectedItems.has(cartItem._id)}
                                    aria-label={`Select ${cartItem.productName}`}
                                />
                                <div className="flex w-full ring-1 ring-gray-300 rounded-sm px-4 py-3">
                                    <div className='w-1/5'>
                                        {cartItem.productImages && cartItem.productImages.length > 0 && (
                                            // <Image
                                            //     src={cartItem.productImages[0].imageUrl}
                                            //     alt={cartItem.productName}
                                            //     width={200}
                                            //     height={200}
                                            //     objectFit="cover"
                                            //     className="h-full w-full object-cover"
                                            // />
                                            <img src={cartItem.productImages[0].imageUrl} />
                                        )}
                                        
                                    </div>
                                    <div className='w-4/5'>
                                        <div>
                                            <h1 className='font-semibold text-2xl'>{cartItem.productName}</h1>
                                            <p className='text-lg'>{cartItem.productDescription}</p>
                                            <div className="flex justify-between">
                                                <p><strong className='font-semibold'>Agrication Method:</strong> {cartItem.agricationMethod}</p>
                                                <p><strong className='font-semibold'>Price Per kg:</strong> {cartItem.price.newPrice}</p>
                                            </div>
                                            <div className='flex gap-4 my-2'>
                                                <div className='gap-2'>
                                                    <button
                                                        className='ring-1 ring-gray-300 px-2 py-[2px] rounded hover:ring-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out duration-500 cursor-pointer'
                                                        onClick={() => handleQuantityChange(cartItem._id, cartItem.quantity.value - (cartItem.quantity.unit === 'kg' ? 1 : 50))}>-</button>
                                                    <input
                                                        type="number"
                                                        value={cartItem.quantity.value}
                                                        onChange={(e) =>
                                                            handleQuantityChange(cartItem._id, Number(e.target.value))
                                                        }
                                                        className='text-center mx-1 outline-none h-full focus:ring-1 ring-gray-300 transition ease-in-out duration-300 rounded w-20 no-spinner'
                                                        min={1}
                                                    />
                                                    <button
                                                        className='ring-1 ring-gray-300 px-2 py-[2px] rounded hover:ring-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out duration-500 cursor-pointer'
                                                        onClick={() => handleQuantityChange(cartItem._id, cartItem.quantity.value + (cartItem.quantity.unit === 'kg' ? 1 : 50))}>+</button>
                                                </div>
                                                <label htmlFor={`kg-${cartItem._id}`} className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        id={`kg-${cartItem._id}`}
                                                        name={`unit-${cartItem._id}`}
                                                        checked={cartItem.quantity.unit === 'kg'}
                                                        onChange={() => handleUnitChange(cartItem._id, 'kg')}
                                                        aria-label="Kilograms"
                                                        className='accent-primaryColor'
                                                    /> kg
                                                </label>
                                                <label htmlFor={`gram-${cartItem._id}`} className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        id={`gram-${cartItem._id}`}
                                                        name={`unit-${cartItem._id}`}
                                                        checked={cartItem.quantity.unit === 'g'}
                                                        onChange={() => handleUnitChange(cartItem._id, 'g')}
                                                        aria-label="Grams"
                                                        className='accent-primaryColor'
                                                    /> gram
                                                </label>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            {/* Displaying the subtotal for each product */}
                                            <p className='text-base'>
                                                <strong className='font-semibold text-lg'>Subtotal:</strong> {calculateProductSubtotal(cartItem)} LKR
                                            </p>

                                            <button
                                                onClick={() => handleRemoveCart(cartItem._id)}
                                                className='flex gap-2 items-center bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded transition ease-in-out duration-300'
                                            >
                                                Remove from cart <BsCartX />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="relative w-2/5 h-[84vh] z-0">
                    <h2 className='font-semibold text-2xl mb-5'>Order Summary</h2>
                    <div className="h-[80%] overflow-y-auto no-scrollbar">
                        {selectedItems.size === 0 ? (
                            <p className="flex items-center justify-center text-gray-500 py-4 w-full h-full">You didn't select an item for order</p>
                        ) : (
                            [...selectedItems].map((selectedItemId) => {
                                const selectedItem = cartItems.find(item => item._id === selectedItemId);
                                return selectedItem ? (
                                    <div key={selectedItem._id} className='flex p-4 border-b-[1px] hover:bg-gray-100 transition ease-in-out duration-300'>
                                        <div className='w-1/3 h-full'>
                                            {/* <Image
                                                src={selectedItem.productImages[0].imageUrl}
                                                alt={selectedItem.productName}
                                                width={100}
                                                height={100}
                                                objectFit="cover"
                                                className="h-full w-full object-cover"
                                            /> */}
                                        </div>
                                        <div className='w-2/3'>
                                            <div className='flex justify-between items-start w-full'>
                                                <h3 className='font-semibold'>{selectedItem.productName}</h3>
                                                <p className='w-max px-4 py-1 bg-gray-200 text-center rounded'>
                                                    <span className='font-semibold'>Sub Total: </span>{calculateProductSubtotal(selectedItem)} LKR
                                                </p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <div className='mt-2'>
                                                    <p><strong className='font-semibold'>Qty: </strong>{selectedItem.quantity.value} {selectedItem.quantity.unit}</p>
                                                    <p><span className='font-semibold'>Price Per kg: </span>{selectedItem.price.newPrice} LKR</p>
                                                </div>
                                                <button
                                                    onClick={() => handleUnpin(selectedItem._id)}
                                                    className='text-red-700 text-xl h-max w-max p-1 rounded-2xl hover:bg-red-700 hover:text-white transition ease-in-out duration-500'
                                                    aria-label={`Remove ${selectedItem.productName} from Order Summary`}
                                                >
                                                    <RiUnpinFill />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : null;
                            })
                        )}
                    </div>
                    <div className="absolute bottom-0 w-full">
                        <div className='flex justify-between items-center py-4'>
                            <p className='font-semibold'>{selectedItems.size} Items Selected</p>
                            <p className='font-semibold text-xl'>Total: {calculateCartTotal()} LKR</p>
                        </div>
                        <p className='w-full text-center text-gray-600 mb-4'>Shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={handleCheckout}
                            className='bg-primaryColor text-white w-full px-8 py-2 rounded'
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default CartPage;
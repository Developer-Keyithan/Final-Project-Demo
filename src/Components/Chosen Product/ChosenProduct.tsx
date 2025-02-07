import { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import "./ChosenProduct.css";
import cartItems from "../../Data/ProductData";

interface Product {
    id: string;
    name: string;
    image: string | StaticImageData;
    newPrice: string;
}

const ChosenProduct: React.FC = () => {
    const [quantities, setQuantities] = useState<number[]>(
        cartItems.map(() => 1)
    );
    const [items, setItems] = useState<Product[]>(cartItems);

    const handleIncrement = (index: number) => {
        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        setQuantities(newQuantities);
    };

    const handleDecrement = (index: number) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) newQuantities[index] -= 1;
        setQuantities(newQuantities);
    };

    const handleCancel = (index: number) => {
        const newItems = items.filter((item, i) => i !== index);
        setItems(newItems);
        const newQuantities = quantities.filter((_, i) => i !== index);
        setQuantities(newQuantities);
    };

    return (
        <div style={{ padding: "20px" }}>
            {items.map((item, index) => {
                const price = parseFloat(item.newPrice);
                const subTotal = price * quantities[index];

                return (
                    <div key={item.id} className="chosen-product-container">
                        <div className="image">
                            <Image
                                src={item.image}
                                alt={item.name}
                                className="img"
                            />
                        </div>
                        <div className="details">
                            <h3>{item.name}</h3>
                            <p>Price: Rs.{item.newPrice} Per kg</p>
                            <div className="controls">
                                <button onClick={() => handleDecrement(index)}>-</button>
                                <span>{quantities[index]}</span>
                                <button onClick={() => handleIncrement(index)}>+</button>
                            </div>
                            <div className="sub-total-and-cancel-btn">
                                <p>Sub Total: Rs. {subTotal}</p>
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancel(index)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChosenProduct;

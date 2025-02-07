'use client'

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const S3UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
    const [district, setDistrict] = useState<string>('');
    const [agricationMethod, setAgricationMethod] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [harvestingDate, setHarvestingDate] = useState<string>('');
    const [product, setProduct] = useState<any>(null);
    const [userId, setUserId] = useState<string>('')

    const categoryOptions = ["fruits", "vegetables", "grains", "dairy", "meat"];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/cookie');
                setUserId(data.user.id)
            } catch (error) {
                console.log(error)
            }
        };

        fetchUser();
    }, []);
    console.log(userId)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategories(prev =>
            prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value]
        );
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(e.target.value);  // Set the unit directly
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/s3-upload', {
                method: 'POST',
                body: formData
            });

            if (response.status === 200) {
                const data = await response.json();
                const url = data.imageUrl;

                setUploading(false);

                // Prepare product data here with the latest state values
                const newProduct = {
                    userId,
                    ProductImage: url,
                    productName,
                    productDescription: description,
                    price: newPrice,
                    categories,
                    harvestingDate,
                    agricationMethod,
                    stockValue: stock,
                    unit
                };

                // Update the product state with the latest values
                setProduct(newProduct);
                console.log(newProduct);

                const addProduct = await axios.post('/api/product', {
                    newProduct
                })
                console.log(addProduct.status)
            }
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    // Function to format the "time ago" string
    const timeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) {
            return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        }
        const days = Math.floor(hours / 24);
        if (days < 7) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }
        const weeks = Math.floor(days / 7);
        if (weeks < 4) {
            return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
        }
        const months = Math.floor(weeks / 4);
        if (months < 12) {
            return `${months} month${months === 1 ? '' : 's'} ago`;
        }
        const years = Math.floor(months / 12);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    };

    return (
        <div>
            <h1>S3 Upload Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} required />

                <input type="text" placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} required />

                <textarea placeholder='Product Description' value={description} onChange={(e) => setDescription(e.target.value)} required />

                <input type="number" placeholder='Price per kilogram' value={newPrice || ''} onChange={(e) => setNewPrice(Number(e.target.value))} required />

                <input type="text" placeholder='Your district' value={district} onChange={(e) => setDistrict(e.target.value)} required />

                <label>
                    <input type="radio" name="agricationMethod" value="organic" onChange={(e) => setAgricationMethod(e.target.value)} />
                    Organic
                </label>
                <label>
                    <input type="radio" name="agricationMethod" value="inorganic" onChange={(e) => setAgricationMethod(e.target.value)} />
                    Inorganic
                </label>

                <input type="number" placeholder='Available Stock' value={stock} onChange={(e) => setStock(e.target.value)} required />

                <label>
                    <input type="radio" name="unit" value="gram" checked={unit === "gram"} onChange={handleUnitChange} />
                    Gram
                </label>

                <label>
                    <input type="radio" name="unit" value="kg" checked={unit === "kg"} onChange={handleUnitChange} />
                    Kilogram
                </label>

                {/* Multi-select checkboxes for categories */}
                <div>
                    <p>Select Categories:</p>
                    {categoryOptions.map(category => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                value={category}
                                checked={categories.includes(category)}
                                onChange={handleCategoryChange}
                            />
                            {category}
                        </label>
                    ))}
                </div>

                <input type="date" value={harvestingDate} onChange={(e) => setHarvestingDate(e.target.value)} required />

                <button type="submit" disabled={!file || uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>

            {product && (
                <div>
                    <Image src={product.ProductImage} alt={product.productName} width={200} height={200} />
                    <div>
                        <p>{product.productName}</p>
                        <p>{product.price}</p>
                        <p>Categories: {product.categories.join(', ')}</p>
                        <p>Harvesting Date: {timeAgo(product.harvestingDate)}</p>
                        <p>Unit: {product.unit}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default S3UploadForm;

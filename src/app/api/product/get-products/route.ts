import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import Product from '../../../../lib/Models/Product';

export const POST = async (req: NextRequest) => {
    try {
        const { productIds } = await req.json();

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return NextResponse.json({ message: "Invalid product IDs" }, { status: 400 });
        }

        await DBconnect();

        const products = await Product.find({ _id: { $in: productIds } });

        if (!products.length) {
            return NextResponse.json({ message: "No products found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Products retrieved successfully",
            products: products 
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Error retrieving products", error: error.message }, { status: 500 });
    }
};

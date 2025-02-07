import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import Product from '../../../../lib/Models/Product';

export const POST = async (req: NextRequest) => {
    try {
        const { productId } = await req.json(); 

        await DBconnect();

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Product retrieved successfully",
            product: product 
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error retrieving product" }, { status: 500 });
    }
};

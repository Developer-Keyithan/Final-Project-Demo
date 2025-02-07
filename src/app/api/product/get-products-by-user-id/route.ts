import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import Product from '../../../../lib/Models/Product';

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        await DBconnect();
        const userProducts = await Product.find({ userId });

        if (userProducts.length === 0) {
            return NextResponse.json(
                { message: "No products found for this user" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Products retrieved successfully",
            products: userProducts
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error retrieving products:", error);

        return NextResponse.json({
            message: "Error retrieving products",
            error: error.message
        }, { status: 500 });
    }
};

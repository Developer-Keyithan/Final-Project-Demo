import { NextRequest, NextResponse } from "next/server";
import Cart from "../../../lib/Models/Cart";
import connectDb from "../../../lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId, productId, value, unit } = body;

        if (!userId) return NextResponse.json({ message: "User id is required" }, { status: 400 });
        if (!productId) return NextResponse.json({ message: "Product id is required" }, { status: 400 });

        await connectDb();

        const newCart = new Cart({
            userId,
            productId,
            quantity: { value, unit }
        });

        await newCart.save();

        return NextResponse.json({ message: "Cart added successfully", newCart }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to add cart " }, { status: 500 });
    }
};


export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { cartId } = body;

        if (!cartId) {
            return NextResponse.json({ message: "Cart id is required" }, { status: 400 });
        }

        await connectDb();

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }

        await Cart.findByIdAndDelete(cartId);

        return NextResponse.json({ message: "Cart deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete cart"}, { status: 500 });
    }
};


export const PUT = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { cartId, value, unit } = body;

        if (!cartId) return NextResponse.json({ message: "Cart id is required" }, { status: 400 });

        await connectDb();
        const cart = await Cart.findById(cartId);

        if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

        cart.quantity = { value, unit };
        await cart.save();

        return NextResponse.json({ message: "Cart updated successfully", cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update cart "}, { status: 500 });
    }
};
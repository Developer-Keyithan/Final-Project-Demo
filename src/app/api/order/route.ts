import { NextRequest, NextResponse } from "next/server";
import Order from "../../../lib/Models/Order";
import DBconnect from "../../../lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId, productIds, quantities, deliveryAddressId, cardId, couponDiscount, promoCodeDiscount, totalPrice, status } = body;

        if (!userId) return NextResponse.json({ message: "User id is required" }, { status: 400 });
        if (!productIds) return NextResponse.json({ message: "At least one product required" }, { status: 400 });
        if (!quantities) return NextResponse.json({ message: "Quantity is required" }, { status: 400 });
        if (!deliveryAddressId) return NextResponse.json({ message: "Delivery address is required" }, { status: 400 });
        if (!cardId) return NextResponse.json({ message: "Card id is required" }, { status: 400 });
        if (!couponDiscount) return NextResponse.json({ message: "Coupon discount is required" }, { status: 400 });
        if (!promoCodeDiscount) return NextResponse.json({ message: "Promo code discount is required" }, { status: 400 });
        if (!totalPrice) return NextResponse.json({ message: "Total price is required" }, { status: 400 });
        if (!status) return NextResponse.json({ message: "Status is required" }, { status: 400 });

        await DBconnect();

        const products = productIds.map((productId: string, index: number) => {
            return {
                productId,
                quantity: quantities[index],
                price: 0
            };
        });

        const newOrder = new Order({
            userId,
            products,
            deliveryAddressId,
            cardId,
            couponDiscount,
            promoCodeDiscount,
            totalPrice,
            status
        });

        await newOrder.save();

        return NextResponse.json({ message: "Order placed successfully", newOrder }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to create order " }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { orderId, status } = body;

        if (!orderId) return NextResponse.json({ message: "Order id is required" }, { status: 400 });

        await DBconnect();
        const order = await Order.findById(orderId);

        if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        order.status = status;
        await order.save();

        if (status === "shipped") {
            return NextResponse.json({ message: "Order shipped", order }, { status: 200 });
        }

        if (status === "delivered") {
            return NextResponse.json({ message: "Order delivered", order }, { status: 200 });
        }

        if (status === "cancelled") {
            return NextResponse.json({ message: "Order cancelled", order }, { status: 200 });
        }

        if (status === "placed") {
            return NextResponse.json({ message: "Ordered again", order }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Failed to update order " }, { status: 500 });
    }
};
import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../lib/Models/Order";
import DBconnect from "../../../../lib/db";

export const POST = async (req: NextRequest) => {
    try {
        
        const body = await req.json();
        const { userId } = body;

        if (!userId) return NextResponse.json({ message: "User id is required" }, { status: 400 });

        await DBconnect();

        const orders = await Order.findById(userId);

        if (!orders) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        return NextResponse.json({ message: orders }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch order " }, { status: 500 });
    }
};
import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import DeliveryAddress from '../../../../lib/Models/DeliveryAddress';

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
        const userDeliveryAddress = await DeliveryAddress.find({ userId });
        if (userDeliveryAddress.length === 0) {
            return NextResponse.json(
                { message: "No delivery address found for this user" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Delivery addresses retrieved successfully",
            userDeliveryAddress
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Error retrieving delivery addresses",
        }, { status: 500 });
    }
};

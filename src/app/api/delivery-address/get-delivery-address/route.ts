import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import DeliveryAddress from '../../../../lib/Models/DeliveryAddress';

export const POST = async (req: NextRequest) => {
    try {
        const { deliveryAddressId } = await req.json(); 

        await DBconnect();

        const deliveryAddress = await DeliveryAddress.findById(deliveryAddressId);

        if (!deliveryAddress) {
            return NextResponse.json({ message: "Delivery address not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Delivery address retrieved successfully",
            deliveryAddress
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: "Error retrieving delivery address", error: error.message }, { status: 500 });
    }
};

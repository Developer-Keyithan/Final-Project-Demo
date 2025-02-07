import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../lib/db';
import DeliveryAddress from '../../../lib/Models/DeliveryAddress';
import { Types } from 'mongoose';

export const POST = async (req: NextResponse) => {

    try {
        const body = await req.json();
        const {
            userId,
            place,
            no,
            street,
            town,
            division,
            district,
            contactNumber
        } = body;

        if (!town) return NextResponse.json({ error: "Town is required" }, { status: 400 });
        if (!division) return NextResponse.json({ error: "Division is required" }, { status: 400 });
        if (!district) return NextResponse.json({ error: "District is required" }, { status: 400 });
        if (!contactNumber || contactNumber.length === 0) {
            return NextResponse.json({ error: "At least one contact number is required" }, { status: 400 })
        }

        await DBconnect();

        const newDeliveryAddress = new DeliveryAddress({
            userId,
            place,
            no,
            street,
            town,
            division,
            district,
            contactNumber
        });

        await newDeliveryAddress.save();

        return NextResponse.json({
            message: "New delivery address added successfully",
            newDeliveryAddress
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: "Error adding new delivery address",
            error: error.message
        }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        await DBconnect();
        const deliveryAddress = await DeliveryAddress.find()

        return NextResponse.json(deliveryAddress, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch all delivery address data." }, { status: 500 });
    }
}

export const PATCH = async (req: NextResponse) => {
    try {
        const body = await req.json();
        const {
            deliveryAddressId,
            place,
            no,
            street,
            town,
            division,
            district,
            contactNumber
        } = body;

        if (!deliveryAddressId) return NextResponse.json({ error: "Delivery address id is required" }, { status: 400 });

        await DBconnect();
        const updateDeliveryAddress = await DeliveryAddress.findById(deliveryAddressId);

        if (!updateDeliveryAddress) return NextResponse.json({ error: "Delivery address not found" }, { status: 404 });

        if (place) updateDeliveryAddress.place = place;
        if (no) updateDeliveryAddress.no = no;
        if (street) updateDeliveryAddress.street = street;
        if (town) updateDeliveryAddress.town = town;
        if (division) updateDeliveryAddress.division = division;
        if (district) updateDeliveryAddress.district = district;
        if (contactNumber) updateDeliveryAddress.contactNumber = contactNumber;

        await updateDeliveryAddress.save();

        return NextResponse.json({
            message: "Delivery address update successfully",
            updateDeliveryAddress
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: "Error updating delivery address.",
            error: error.message
        }, { status: 500 });
    };
};

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { deliveryAddressId } = body;

        if (!deliveryAddressId) return NextResponse.json({ error: "Delivery address id is required" }, { status: 400 });

        await DBconnect();
        const deleteDeliveryAddress = await DeliveryAddress.findById(deliveryAddressId);

        if (!deleteDeliveryAddress) {
            return NextResponse.json({ message: "Delivery address not found" }, { status: 404 });
        }

        await DeliveryAddress.findByIdAndDelete(deliveryAddressId);
        return NextResponse.json({message: "Address deleted successfully"}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({message: "Can't delete delivery address", error: error.message}, {status: 500})
    }
};
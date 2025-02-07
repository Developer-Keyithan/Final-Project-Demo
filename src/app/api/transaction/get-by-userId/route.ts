import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/db";
import Transaction from "../../../../lib/Models/Transaction";

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
        const userTransactions = await Transaction.find({ userId });

        if (userTransactions.length === 0) {
            return NextResponse.json(
                { message: "No bank card found for this user" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Bank cards retrieved successfully",
            userTransactions
        }, { status: 200 });

    } catch (error) {
        console.error("Error retrieving bank cards:", error);

        return NextResponse.json({
            message: "Error retrieving bank cards",
            error
        }, { status: 500 });
    }
};
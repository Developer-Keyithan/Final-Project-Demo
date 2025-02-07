import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/db";
import BankCard from "../../../../lib/Models/BankCard";

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
        const userBankCards = await BankCard.find({ userId });

        if (userBankCards.length === 0) {
            return NextResponse.json(
                { message: "No bank card found for this user" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Bank cards retrieved successfully",
            cards: userBankCards
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error retrieving bank cards:", error);

        return NextResponse.json({
            message: "Error retrieving bank cards",
            error: error.message
        }, { status: 500 });
    }
};
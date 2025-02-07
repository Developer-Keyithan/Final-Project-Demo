import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/db";
import BankCard from "../../../../lib/Models/BankCard";

export const POST = async (req: NextRequest) => {
    try {
        const { bankCardId } = await req.json();
        await DBconnect();

        const bankCard = await BankCard.findById(bankCardId);

        if (!bankCard) {
            return NextResponse.json({ message: "Bank card not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Bank card retrieved successfully",
            bankCard
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error retrieving bank card", error: error.message }, { status: 500 });
    }
};
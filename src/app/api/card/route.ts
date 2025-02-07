import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../lib/db';
import BankCard from '../../../lib/Models/BankCard';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        console.log(body)
        const { userId, branch, bankName, cardNumber, cvv, year, month, cardType } = body;

        if (!bankName) return NextResponse.json({ error: "Select your card provided bank" }, { status: 400 });
        if (!cardNumber) return NextResponse.json({ error: "Card number is required" }, { status: 400 });
        if (!cvv) return NextResponse.json({ error: "CVV number is required" }, { status: 400 });
        if (!year) return NextResponse.json({ error: "Expiration date is required" }, { status: 400 });
        if (!month) return NextResponse.json({ error: "Expiration date is required" }, { status: 400 });
        if (!cardType) return NextResponse.json({ error: "Select your card type" }, { status: 400 });

        await DBconnect();

        const newBankCard = new BankCard({
            userId,
            bankName,
            cardNumber,
            cvv,
            branch,
            expireDate: { month, year },
            cardType
        });

        console.log(newBankCard)

        await newBankCard.save();

        return NextResponse.json({
            message: "New bank card added successfully",
            newBankCard
        }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            message: "Error add new bank card",
            error: error.message
        }, { status: 500 })
    }
};


export const GET = async (req: NextRequest) => {
    try {
        await DBconnect();
        const bankCards = await BankCard.find();
        return NextResponse.json(bankCards, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Error fetching bank cards",
            error: error.message
        }, { status: 500 })
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { bankCardId } = body;
        if (!bankCardId) return NextResponse.json({ error: "Card id is required" }, { status: 400 });

        await DBconnect();
        const deletedCard = await BankCard.findByIdAndDelete(bankCardId);

        if (!deletedCard) return NextResponse.json({ error: "Card not found" }, { status: 404 });

        return NextResponse.json({
            message: "Card deleted successfully",
            deletedCard
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Error deleting card",
            error: error.message
        }, { status: 500 })
    }
};

export const PATCH = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { bankCardId, bankName, cardNumber, cvv, date, month, cardType } = body;

        if (!bankCardId) return NextResponse.json({ error: "Card id is required" }, { status: 400 });

        await DBconnect();
        const updatedCard = await BankCard.findByIdAndUpdate(bankCardId, {
            bankName,
            cardNumber,
            cvv,
            expireDate: { date, month },
            cardType
        }, { new: true });

        if (!updatedCard) return NextResponse.json({ error: "Card not found" }, { status: 404 });

        return NextResponse.json({
            message: "Card updated successfully",
            updatedCard
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Error updating card",
            error: error.message
        }, { status: 500 })
    }
};
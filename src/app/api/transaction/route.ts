import { NextApiRequest} from "next";
import transactionModel from "../../../lib/Models/Transaction";
import connectDB from "../../../lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
    try {
        const body = await req.body;
        const { consumerId, orderId, productId, sellerId, price, totalTransactionAmount, status } = body;

        await connectDB();

        const transaction = new transactionModel({
            consumerId,
            orderId,
            products: [{ productId, sellerId, price }],
            totalTransactionAmount,
            status
        });

        await transaction.save();
        

        return NextResponse.json({ message: 'Transaction successfull' });
    } catch (error) {
        return NextResponse.json({ message: 'Transaction failed' });
    }
}
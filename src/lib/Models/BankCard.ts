import { Schema, model, models } from 'mongoose';

const bankCardSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bankName: { type: String, required: true },
        branch: { type: String, required: false },
        cardNumber: { type: Number, required: true },
        cvv: { type: Number, required: true },
        expireDate: {
            month: { type: Number, required: true },
            year: { type: Number, required: true },
        },
        cardType: { type: String, required: true, enum: ['Visa Card', 'Master Card'] },
    },
    { timestamps: true }
);

const bankCardModel = models.BankCard || model('BankCard', bankCardSchema);

export default bankCardModel;
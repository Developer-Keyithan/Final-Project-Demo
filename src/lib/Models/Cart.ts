import { Schema, model, models } from "mongoose";

const cartSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: {
            value: { type: Number, required: true, min: 0 },
            unit: { type: String, required: true, enum: ["kg", "g"] }
        }
    },
    { timestamps: true }
);

const cartModel = models.Cart || model("Cart", cartSchema);

export default cartModel;

import { Schema, model, models } from 'mongoose'

const deliveryAddressSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        place: { type: String, required: true, enum: ['Home', 'Work Place', 'Undifined'] },
        no: { type: Number, required: false },
        street: { type: String, required: false },
        town: { type: String, required: true },
        division: { type: String, required: true },
        district: { type: String, required: true },
        contactNumber: { type: [Number], required: true }
    },
    { timestamps: true }
);

const deliveryAddressModel = models.DeliveryAddress || model('DeliveryAddress', deliveryAddressSchema);

export default deliveryAddressModel;
import { Schema, models, model } from 'mongoose';

const sellerSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" ,required: true },
        businessData: [
            {
                name: { type: String, required: true },
                email: { type: String, reqiured: false },
                phoneNumber: { type: String, reqiured: true },
                type: { type: String, required: true },
                registrationNumber: { type: String, required: false },
                taxtIdentificationNumber: { type: String, reqiured: false },
            }
        ],
        businessAddress: [
            {
                no: { type: Number, required: false },
                street: { type: String, required: false },
                town: { type: String, required: true },
                postalCode: { type: String, required: false  }
            }
        ],
        pickupAddress: [
            {
                no: { type: Number, required: false },
                street: { type: String, required: false },
                town: { type: String, required: false },
                postalCode: { type: String, required: false }
            }
        ],
        citizenShip: { type: Boolean, required: true },
        country: { type: String, required: true },
        bankData: [
            {
                name: { type: String, required: true },
                accountNumber: { type: Number, required: true },
                accountHolderName: { type: String, required: true }
            }
        ],
        sourceOfProducts: { type: String, required: true },
        iamges: [
            {
                NIC: [
                    {
                        frontSideImage: { type: String, required: true },
                        backSideImage: { type: String, required: true }
                    }
                ],
                passport: [
                    {
                        frontSideImage: { type: String, required: true },
                        backSideImage: { type: String, required: true }
                    }
                ],
                bussinessRegistrationCertificate: [
                    {
                        frontSideImage: { type: String, required: false },
                        backSideImage: { type: String, required: false }
                    }
                ],
            }
        ],
        deliveryReference: { type: String, required: true },
        termsAndConditions: { type: Boolean, required: true}
    }
);

const sellerModel = models.Seller || model("Seller", sellerSchema);

export default sellerModel
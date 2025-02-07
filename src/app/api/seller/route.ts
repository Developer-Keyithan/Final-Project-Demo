import { NextRequest, NextResponse } from "next/server";
import Seller from "../../../lib/Models/Seller";
import connectDB from "../../../lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const {
            userId,
            name,
            email,
            password,
            contactNumber,
            registrationNumber,
            taxtIdentificationNumber,
            businessAddressNo,
            businessAddressStreet,
            businessAddressTown,
            businessAddressPostalCode,
            pickupAddressNo,
            pickupAddressStreet,
            pickupAddressTown,
            pickupAddressPostalCode,
            citizenShip,
            country,
            bankName,
            accountNumber,
            accountHolderName,
            sourceOfProducts,
            NICFrontSideImage,
            NICBackSideImage,
            passportFrontSideImage,
            passportBackSideImage,
            bussinessRegistrationCertificateFrontSideImage,
            bussinessRegistrationCertificateBackSideImage,
            deliveryReference,
            termsAndConditions } = body;

        if (!userId || !name || !email || !password || !contactNumber || !citizenShip || !country || !bankName || !accountNumber || !accountHolderName || !sourceOfProducts || !NICFrontSideImage || !NICBackSideImage || !passportFrontSideImage || !passportBackSideImage || !deliveryReference || !termsAndConditions) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        };

        await connectDB();

        const newSeller = new Seller({
            userId,
            businessData: [
                {
                    name,
                    email,
                    contactNumber,
                    registrationNumber,
                    taxtIdentificationNumber
                }
            ],
            businessAddress: [
                {
                    no: businessAddressNo,
                    street: businessAddressStreet,
                    town: businessAddressTown,
                    postalCode: businessAddressPostalCode
                }
            ],
            pickupAddress: [
                {
                    no: pickupAddressNo,
                    street: pickupAddressStreet,
                    town: pickupAddressTown,
                    postalCode: pickupAddressPostalCode
                }
            ],
            citizenShip,
            country,
            bankData: [
                {
                    name: bankName,
                    accountNumber,
                    accountHolderName
                }
            ],
            sourceOfProducts,
            iamges: [
                {
                    NIC: [
                        {
                            frontSideImage: NICFrontSideImage,
                            backSideImage: NICBackSideImage
                        }
                    ],
                    passport: [
                        {
                            frontSideImage: passportFrontSideImage,
                            backSideImage: passportBackSideImage
                        }
                    ],
                    bussinessRegistrationCertificate: [
                        {
                            frontSideImage: bussinessRegistrationCertificateFrontSideImage,
                            backSideImage: bussinessRegistrationCertificateBackSideImage
                        }
                    ],
                }
            ],
            deliveryReference,
            termsAndConditions
        });

        await newSeller.save();

        return NextResponse.json({ message: "Your account is successfully converted to a seller account" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to create a seller account", error}, { status: 500 });
    }
};

export const PATCH = async (req: NextRequest) => {
    try {
        const { sellerId, name, email, contactNumber, registrationNumber, taxtIdentificationNumber, businessAddressNo, businessAddressStreet, businessAddressTown, businessAddressPostalCode, pickupAddressNo, pickupAddressStreet, pickupAddressTown, pickupAddressPostalCode, citizenShip, country, bankName, accountNumber, accountHolderName, sourceOfProducts, NICFrontSideImage, NICBackSideImage, passportFrontSideImage, passportBackSideImage, bussinessRegistrationCertificateFrontSideImage, bussinessRegistrationCertificateBackSideImage, deliveryReference, termsAndConditions } = await req.json();
        await connectDB();

        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return NextResponse.json({ message: "Seller not found" }, { status: 404 });
        }

        if (name) seller.businessData[0].name = name;
        if (email) seller.businessData[0].email = email;
        if (contactNumber) seller.businessData[0].contactNumber = contactNumber;
        if (registrationNumber) seller.businessData[0].registrationNumber = registrationNumber;
        if (taxtIdentificationNumber) seller.businessData[0].taxtIdentificationNumber = taxtIdentificationNumber;
        if (businessAddressNo) seller.businessAddress[0].no = businessAddressNo;
        if (businessAddressStreet) seller.businessAddress[0].street = businessAddressStreet;
        if (businessAddressTown) seller.businessAddress[0].town = businessAddressTown;
        if (businessAddressPostalCode) seller.businessAddress[0].postalCode = businessAddressPostalCode;
        if (pickupAddressNo) seller.pickupAddress[0].no = pickupAddressNo;
        if (pickupAddressStreet) seller.pickupAddress[0].street = pickupAddressStreet;
        if (pickupAddressTown) seller.pickupAddress[0].town = pickupAddressTown;
        if (pickupAddressPostalCode) seller.pickupAddress[0].postalCode = pickupAddressPostalCode;
        if (citizenShip !== undefined) seller.citizenShip = citizenShip;
        if (country) seller.country = country;
        if (bankName) seller.bankData[0].name = bankName;
        if (accountNumber) seller.bankData[0].accountNumber = accountNumber;
        if (accountHolderName) seller.bankData[0].accountHolderName = accountHolderName;
        if (sourceOfProducts) seller.sourceOfProducts = sourceOfProducts;
        if (NICFrontSideImage) seller.iamges[0].NIC[0].frontSideImage = NICFrontSideImage;
        if (NICBackSideImage) seller.iamges[0].NIC[0].backSideImage = NICBackSideImage;
        if (passportFrontSideImage) seller.iamges[0].passport[0].frontSideImage = passportFrontSideImage;
        if (passportBackSideImage) seller.iamges[0].passport[0].backSideImage = passportBackSideImage;
        if (bussinessRegistrationCertificateFrontSideImage) seller.iamges[0].bussinessRegistrationCertificate[0].frontSideImage = bussinessRegistrationCertificateFrontSideImage;
        if (bussinessRegistrationCertificateBackSideImage) seller.iamges[0].bussinessRegistrationCertificate[0].backSideImage = bussinessRegistrationCertificateBackSideImage;
        if (deliveryReference) seller.deliveryReference = deliveryReference;
        if (termsAndConditions !== undefined) seller.termsAndConditions = termsAndConditions;

        await seller.save();

        return NextResponse.json({ message: "Seller updated successfully", seller }, { status: 200 });

    }
    catch (error) {
        return NextResponse.json({ message: "Error updating seller", error }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { sellerId } = await req.json();
        await connectDB();

        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return NextResponse.json({ message: "Seller not found" }, { status: 404 });
        }

        await seller.delete();

        return NextResponse.json({ message: "Seller account deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error deleting seller", error }, { status: 500 });
    }
};
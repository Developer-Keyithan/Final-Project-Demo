interface Coupon {
    name: string;
    description: string;
    discountAmount?: number;
    discountPercentage?: number;
}

const couponData: Coupon[] = [
    {
        name: 'fresh100',
        description: 'Get Rs. 100 off on your first order',
        discountAmount: 100
    },
    {
        name: 'thankyou10',
        description: 'Get 10% off on your 5th order as a loyal customer',
        discountPercentage: 10
    }
];

export default couponData;

import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../lib/db';
import RatingReviews from '../../../lib/Models/ReviewRating';

export const GET = async (req: NextRequest) => {
    try {
        await DBconnect();
        const ratingReviews = await RatingReviews.find();
        return NextResponse.json({ ratingReviews }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({message: "Error fetching ratings and reviews",  error: error.message }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { userId, productId, review, rating } = body;

    try {
        DBconnect();
        const newRatingReview = new RatingReviews({ userId, productId, review, rating });

        await newRatingReview.save();
        return NextResponse.json({ message: "Rating and review added successfully", newRatingReview }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error add your rating and review", error:error.message }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest) => {
    const body = await req.json();
    const { ratingReviewId } = body;

    try {
        DBconnect();
        await RatingReviews.findByIdAndDelete(ratingReviewId);
        return NextResponse.json({ message: "Rating and review deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const PATCH = async (req: NextRequest) => {
    const body = await req.json();
    const { ratingReviewId, review, rating } = body;

    try {
        DBconnect();
        await RatingReviews.findByIdAndUpdate(ratingReviewId, { review, rating });
        return NextResponse.json({ message: "Rating and review updated successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
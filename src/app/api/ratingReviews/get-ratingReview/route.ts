import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/db";
import RatingReviews from "../../../../lib/Models/ReviewRating";

export const POST = async (req: NextRequest) => {
    try {
        const { ratingReviewId } = await req.json();
        await DBconnect();

        const ratingReview = await RatingReviews.findById(ratingReviewId);

        if (!ratingReview) {
            return NextResponse.json({ message: "Rating and review not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Rating and review retrieved successfully",
            ratingReview
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving rating and review", error}, { status: 500 });
    }
};
import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../lib/db";
import RatingReviews from "../../../../lib/Models/ReviewRating";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        await DBconnect();
        const userRatingReviews = await RatingReviews.find({ userId });

        if (userRatingReviews.length === 0) {
            return NextResponse.json(
                { message: "No rating and review found for this user" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Rating and review retrieved successfully",
            userRatingReviews
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Error retrieving rating and review",
            error
        }, { status: 500 });
    }
}
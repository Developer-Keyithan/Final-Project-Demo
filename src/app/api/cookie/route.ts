import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return NextResponse.json(
            { message: 'Unauthorized: No token provided' },
            { status: 401 }
        );
    }

    const { value } = token;

    try {
        const decodedToken = decode(value, { complete: true });

        if (!decodedToken) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 400 }
            );
        }

        const tokenPayload = decodedToken.payload;

        return NextResponse.json(
            { message: 'Token payload extracted', user: tokenPayload },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Failed to decode token', error: error.message },
            { status: 500 }
        );
    }
}

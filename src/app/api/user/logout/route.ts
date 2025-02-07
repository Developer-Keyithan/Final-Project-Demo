import { NextRequest, NextResponse } from 'next/server';

export const POST = async () => {
    try {
        const response = NextResponse.json({ message: 'Logout successful' });

        response.cookies.set('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 0,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
};
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const response = NextResponse.json({ message: 'Logout successful' });

        response.cookies.set('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 0,
        });

        return response;
    } catch (error: any) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
};
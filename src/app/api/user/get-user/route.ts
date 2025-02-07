import { NextRequest, NextResponse } from 'next/server';
import DBconnect from '../../../../lib/db';
import User from '../../../../lib/Models/User';
import { Types } from 'mongoose';

export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json();
      const { userId } = body;
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ error: 'Valid account ID is required' }, { status: 400 });
      }
  
      await DBconnect();
  
      const user = await User.findById(userId);
  
      if (!user) {
        return NextResponse.json({ error: 'Account not found' }, { status: 404 });
      }
  
      return NextResponse.json({
        success: true,
        message: 'Account retrieved successfully',
        user,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: 'Server error'
      }, { status: 500 });
    }
  };
  

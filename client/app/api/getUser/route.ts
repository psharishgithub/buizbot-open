import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';  // Import your User model

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      userId: user._id.toString(),
      googleId: user.googleId
    });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
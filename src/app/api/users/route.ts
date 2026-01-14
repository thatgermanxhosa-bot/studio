import { auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const listUsersResult = await auth.listUsers(10); // Fetch up to 10 users
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    console.error("Error listing users:", error);
    const errorMessage = error.message || "Failed to fetch users";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

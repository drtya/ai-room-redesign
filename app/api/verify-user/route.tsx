import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { user } = await req.json();
  try {
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress.emailAddress));
    if (userInfo?.length == 0) {
      const saveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress.emailAddress,
          imageUrl: user?.imageUrl,
        })
        .returning({ id: Users.id });
        console.log(saveResult[0]);
        
      return NextResponse.json({ result: saveResult[0] });
    }
    return NextResponse.json({ result: userInfo[0] });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

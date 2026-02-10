import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// وظيفة جلب الكورسات (GET)
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'فشل جلب البيانات' }, { status: 500 });
  }
}

// وظيفة حفظ كورس جديد (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCourse = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image || null,
        videoUrl: body.videoUrl || null,
      },
    });
    return NextResponse.json(newCourse);
  } catch (error) {
    return NextResponse.json({ error: 'فشل حفظ الكورس' }, { status: 500 });
  }
}

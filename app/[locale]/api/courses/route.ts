import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'فشل جلب البيانات' }, { status: 500 });
  }
}

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
    console.error("POST Error:", error);
    return NextResponse.json({ error: 'فشل حفظ الكورس' }, { status: 500 });
  }
}

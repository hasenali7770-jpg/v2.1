import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@israa.com' },
    update: {},
    create: {
      email: 'admin@israa.com',
      name: 'مدير النظام',
      role: 'admin',
      password: adminPassword,
    },
  })

  console.log('✅ Admin created:', admin.email)

  // Create sample courses
  const courses = [
    {
      title: 'أسس العمل والمال',
      slug: 'work-money-foundations',
      description: 'دورة شاملة لفهم أساسيات العمل والمال',
      price: 50000,
      level: 'beginner',
      published: true,
      authorId: admin.id,
    },
    {
      title: 'سيكولوجية الذكر والأنثى',
      slug: 'psychology-male-female',
      description: 'فهم عميق للفروق النفسية بين الجنسين',
      price: 75000,
      level: 'intermediate',
      published: true,
      authorId: admin.id,
    },
  ]

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: course,
    })
  }

  console.log('✅ Sample courses created')
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

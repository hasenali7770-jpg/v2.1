import { compare, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'israa-alnoor-academy-super-secret-key-2026'
)

export async function hashPassword(password: string) {
  return await hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null
  return await verifyToken(token)
}

export async function loginWithEmail(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !user.password) {
    throw new Error('Invalid credentials')
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  return user
}

export async function loginWithPhone(phone: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { phone }
  })

  if (!user || !user.password) {
    throw new Error('Invalid credentials')
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  return user
}

export async function registerUser(data: {
  name: string
  email?: string
  phone?: string
  password: string
}) {
  const hashedPassword = await hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      settings: {
        create: {}
      }
    }
  })

  return user
}

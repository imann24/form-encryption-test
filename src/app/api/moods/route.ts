export const dynamic = 'force-dynamic'

import { neon, NeonQueryFunction } from '@neondatabase/serverless'
import { encryptData, decryptData } from '@/lib/encrypt'
import { currentUser, User } from '@clerk/nextjs/server'

async function initEnv(): Promise<{
  errorResponse: Response | null
  user: User | null
  sql: NeonQueryFunction<false, false> | null
}> {
  if (!process.env.DATABASE_URL || !process.env.ENCRYPTION_KEY) {
    return {
      errorResponse: new Response('Missing required env variable(s)', { status: 500 }),
      user: null,
      sql: null,
    }
  }

  const user = await currentUser()
  if (!user) {
    return {
      errorResponse: new Response('Unauthorized', { status: 401 }),
      user: null,
      sql: null,
    }
  }
  const sql = neon(process.env.DATABASE_URL)

  return { user, errorResponse: null, sql }
}

export async function GET() {
  const { errorResponse, user, sql } = await initEnv()
  if (errorResponse || !user || !sql) {
    return errorResponse ?? new Response('Internal Server Error', { status: 500 })
  }

  const data = await sql`SELECT * FROM moods where user_id = ${user.id}`
  const decryptedData = data.map((row: Record<string, string>) => ({
    ...row,
    // we already known the ENCRYPTION_KEY is not null
    mood: decryptData(row.mood, process.env.ENCRYPTION_KEY || '')
  }))
  return new Response(JSON.stringify(decryptedData), { status: 200 })
}

export async function POST(request: Request) {
  const { errorResponse, user, sql } = await initEnv()
  if (errorResponse || !user || !sql) {
    return errorResponse ?? new Response('Internal Server Error', { status: 500 })
  }

  const { mood } = await request.json()
  // we already known the ENCRYPTION_KEY is not null
  const encryptedMood = encryptData(mood, process.env.ENCRYPTION_KEY || '')
  const data = await sql`INSERT INTO moods (user_id, mood, timestamp) VALUES (${user.id}, ${encryptedMood}, ${new Date()})`
  return new Response(JSON.stringify(data), { status: 201 })
}

export async function DELETE(request: Request) {
  const { errorResponse, user, sql } = await initEnv()
  if (errorResponse || !user || !sql) {
    return errorResponse ?? new Response('Internal Server Error', { status: 500 })
  }

  const { moodId } = await request.json()
  const data = await sql`DELETE FROM moods WHERE id = ${moodId} AND user_id = ${user.id}`
  return new Response(JSON.stringify(data), { status: 200 })
}

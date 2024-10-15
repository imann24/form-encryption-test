export const dynamic = 'force-dynamic'

import { neon } from '@neondatabase/serverless'
import { encryptData, decryptData } from '@/lib/encrypt'

let user_id = 'test_user'

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.ENCRYPTION_KEY) {
    return new Response('Missing required env variable(s)', { status: 500 })
  }

  const sql = neon(process.env.DATABASE_URL)
  const data = await sql`SELECT * FROM moods where user_id = ${user_id}`
  const decryptedData = data.map((row: any) => ({
    ...row,
    mood: decryptData(row.mood, process.env.ENCRYPTION_KEY || '')
  }))
  return new Response(JSON.stringify(decryptedData), { status: 200 })
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.ENCRYPTION_KEY) {
    return new Response('Missing required env variable(s)', { status: 500 })
  }

  const sql = neon(process.env.DATABASE_URL)
  const { mood } = await request.json()
  const encryptedMood = encryptData(mood, process.env.ENCRYPTION_KEY)
  const data = await sql`INSERT INTO moods (user_id, mood, timestamp) VALUES (${user_id}, ${encryptedMood}, ${new Date()})`
  return new Response(JSON.stringify(data), { status: 201 })
}

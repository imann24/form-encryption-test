'use client'

import React, { ChangeEvent, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function FeelingForm () {
  const [mood, setMood] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const data = { mood }
    fetch('/api/moods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    setMood('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg bg-white">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-2" />
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Textarea
                placeholder="I'm feeling..."
                value={mood}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMood(e.target.value)}
                rows={5}
                className="w-full resize-none border-2 border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 rounded-lg transition duration-200 ease-in-out text-gray-700 placeholder-gray-400"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mood.trim().length === 0}
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

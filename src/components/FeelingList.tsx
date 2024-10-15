'use client'

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mood } from '@/types'

// This would typically come from your data store or API
const moodResponses = [
  { id: 1, mood: "I'm feeling excited about my new project!", timestamp: "2023-06-15T10:30:00Z" },
  { id: 2, mood: "Feeling a bit stressed with the upcoming deadline.", timestamp: "2023-06-14T14:45:00Z" },
  { id: 3, mood: "Today was a great day! I accomplished all my tasks.", timestamp: "2023-06-13T18:20:00Z" },
  { id: 4, mood: "Feeling inspired after attending a motivational seminar.", timestamp: "2023-06-12T09:15:00Z" },
  { id: 5, mood: "A little tired, but overall content with how the week is going.", timestamp: "2023-06-11T21:00:00Z" },
]

export default function FeelingList() {
  const [ moods, setMoods ] = useState<Mood[]>([])

  async function fetchMoods() {
    const response = await fetch('/api/moods')
    const data = await response.json()
    setMoods(data)
  }

  useEffect(() => {
    fetchMoods()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg bg-white">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-2" />
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Your Moods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {moods.map((response) => (
              <Card key={response.id} className="mb-4 last:mb-0 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-gray-700 mb-2">{response.mood}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(response.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

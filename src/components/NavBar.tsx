'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const pathname = usePathname()

  function linkClass(path: string): string {
    return pathname === path
      ? 'text-sky-600 font-bold underline text-lg'
      : 'text-sky-600 hover:text-sky-500 text-lg'
  }

  return (
    <nav className="fixed flex space-x-10 top-4 left-4">
      <Link href="/" className={`${linkClass('/')}`}>Post</Link>
      <Link href="/saved" className={`${linkClass('/saved')}`}>View</Link>
    </nav>
  )
}

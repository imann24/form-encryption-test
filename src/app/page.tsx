import React from 'react'
import FeelingForm from '@/components/FeelingForm'
import NavBar from '@/components/NavBar'

export default function Home() {
  return (
    <div>
      <main>
        <NavBar />
        <FeelingForm />
      </main>
    </div>
  );
}

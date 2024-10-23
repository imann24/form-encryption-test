import type { Metadata } from 'next'
import localFont from 'next/font/local'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Test Form Encrpytion",
  description: "Simple form and response display to test server-side encryption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400`}
        >
          <SignedOut>
            <div className="fixed left-[48vw] top-[48vh] text-xl [&>*]:border-2 [&>*]:border-black [&>*]:p-3 [&>*]:rounded-md [&>*:hover]:border-sky-500 [&>*:hover]:text-sky-500">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="fixed right-4 top-4">
              <UserButton/>
            </div>
            {children}
            <Toaster />
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}

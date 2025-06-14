import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

async function HomePage() {
    const session=await getServerSession(authOptions);
  return (
      <div className="pt-24 px-6 flex flex-col items-center gap-6 bg-gray-50 fixed inset-32">
  <h1 className="text-3xl font-semibold text-gray-800">Welcome Back, {session?.user?.name}!👋</h1>
  <p className="text-gray-600 max-w-lg text-center">
    Manage your links, track analytics, and customize your ConnectMe page from here.
  </p>

  <div className="flex flex-wrap justify-center gap-6 mt-4">
    <Link className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full shadow hover:scale-105 transition" href="/account">
      Go to Account Page
    </Link>

    <Link className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow hover:scale-105 transition" href="/analytics">
      View Analytics
    </Link>
  </div>
</div>

  )
}

export default HomePage
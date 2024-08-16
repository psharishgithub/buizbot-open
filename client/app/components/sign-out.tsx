// app/components/SignOut.tsx
'use client'

import { handleSignOut } from "../actions/signin"

export default function SignOut() {

  async function handleSignOut(){
    await SignOut()
  }
  return (
    <form action={() => handleSignOut}>
      <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Sign Out
      </button>
    </form>
  )
}
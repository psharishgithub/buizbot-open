'use server'

import { signOut } from "@/app/auth"

export async function handleSignOut() {
  await signOut()
}
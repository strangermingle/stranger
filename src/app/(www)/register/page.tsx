import { RegisterForm } from '@/components/auth/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register — StrangerMingle',
  description: 'Create a new StrangerMingle account',
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-center text-gray-900 dark:text-zinc-50">
          Create an account
        </h1>
        <RegisterForm />
      </div>
    </div>
  )
}

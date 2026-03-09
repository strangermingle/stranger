'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterInput } from '@/lib/validations/auth.schemas'
import { registerAction, checkUsernameAction } from '@/actions/auth.actions'
import Link from 'next/link'

function getPasswordStrength(password: string) {
  let score = 0
  if (!password) return score
  if (password.length > 8) score += 1
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^a-zA-Z\d]/.test(password)) score += 1
  return score // 0 to 4
}

export function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
    mode: 'onChange',
  })

  const username = watch('username')
  const password = watch('password')

  useEffect(() => {
    if (!username || username.length < 3 || errors.username) {
      setUsernameAvailable(null)
      return
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true)
      try {
        const res = await checkUsernameAction(username)
        setUsernameAvailable(res.available)
      } catch {
        setUsernameAvailable(null)
      } finally {
        setCheckingUsername(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [username, errors.username])

  async function onSubmit(data: RegisterInput) {
    if (usernameAvailable === false) return

    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)

    const result = await registerAction(formData)

    if (result?.error) {
      setErrorMsg(result.error)
      setIsLoading(false)
    } else if (result?.success) {
      setSuccessMsg('Account created successfully! You can now log in.')
      setIsLoading(false)
    }
  }

  const strength = getPasswordStrength(password)
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-600']

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
            {successMsg}
            <div className="mt-2">
              <Link href="/login" className="font-semibold underline">Go to login</Link>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="username" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Username
          </label>
          <div className="relative">
            <input
              {...register('username')}
              id="username"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
              placeholder="johndoe"
              disabled={isLoading || !!successMsg}
            />
            {checkingUsername && <span className="absolute right-3 top-2.5 text-xs text-gray-400">Checking...</span>}
            {!checkingUsername && usernameAvailable === true && (
              <span className="absolute right-3 top-2.5 text-xs text-green-500">Available</span>
            )}
            {!checkingUsername && usernameAvailable === false && (
              <span className="absolute right-3 top-2.5 text-xs text-red-500">Taken</span>
            )}
          </div>
          {errors.username && <p className="text-sm text-red-500 dark:text-red-400">{errors.username.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
            placeholder="name@example.com"
            disabled={isLoading || !!successMsg}
          />
          {errors.email && <p className="text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            {...register('password')}
            id="password"
            type="password"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
            disabled={isLoading || !!successMsg}
          />
          {password && password.length > 0 && (
            <div className="mt-2 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800">
              <div
                className={`h-full transition-all duration-300 ${strengthColors[strength]}`}
                style={{ width: `${Math.max(10, (strength / 4) * 100)}%` }}
              />
            </div>
          )}
          {errors.password && <p className="text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            id="confirmPassword"
            type="password"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
            disabled={isLoading || !!successMsg}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !!successMsg || usernameAvailable === false}
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

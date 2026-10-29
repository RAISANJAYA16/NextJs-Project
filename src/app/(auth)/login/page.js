'use client'
import { FORGET_PASSWORD_ROUTE, REGISTER_ROUTE } from '@/app/constants/routes';
import { getAuthToken, getAuthUser, login } from '@/api/auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Spinner from '@/app/component/Spinner';
import useAuthStore from '@/stores/authStores';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const loginUser = useAuthStore((state) => state.loginUser);

  async function onValidSubmit(data) {
    setLoading(true);
    setAuthMessage('');

    try {
      const result = await login({ email: data.email, password: data.password });
      const token = getAuthToken(result);

      if (!token) {
        throw new Error('The login API did not return an authentication token.');
      }

      loginUser({
        user: getAuthUser(result, { email: data.email }),
        token,
      });
    } catch (error) {
      setAuthMessage(
        error instanceof Error ? error.message : 'Unable to log in.',
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full max-w-lg py-4">
      <div className="w-full rounded-lg p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-slate-900 text-3xl font-bold mb-4 dark:text-slate-50">Log in</h1>
          <p className="text-slate-600 text-base leading-relaxed dark:text-slate-400">Log in to your account to access
            your dashboard and manage your projects.</p>
        </div>
        <form className="space-y-6" noValidate onSubmit={handleSubmit(onValidSubmit)}>
          <div>
            <label htmlFor="email" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="john@gmail.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-800 dark:text-slate-50 dark:outline-neutral-700"
              {...register('email', {
                required: 'Enter your email address.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                 },
              })}
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-800 dark:text-slate-50 dark:outline-neutral-700"
              {...register('password', { required: 'Enter your password.' })}
            />
            {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <div className="flex items-start flex-wrap gap-2">
            <label className="flex items-center group has-[input:checked]:text-slate-900">
              <input id="remember" type="checkbox" className="sr-only" {...register('remember')} />
              {/* Custom box */}
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-700
                           bg-white dark:bg-neutral-800
                           group-has-[input:checked]:bg-blue-600
                           group-has-[input:checked]:outline-blue-600
                           group-focus-within:outline-2
                           group-focus-within:outline-blue-600" aria-hidden="true">
                {/* Checkmark */}
                <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M1 5l3 3 7-7" />
                </svg>
              </span>
              <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                Remember me
              </span>
            </label>
            <Link  href={FORGET_PASSWORD_ROUTE} className="ml-auto text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              Forgot password?
            </Link>
          </div>
          {authMessage && (
            <p role="alert" className="text-sm text-red-600">
              {authMessage}
            </p>
          )}
          <button type="submit" disabled={loading} className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-primary hover:bg-primary/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Logging in...' : 'Log in'}
            {loading && <Spinner className="w-4 h-4 ml-2 inline fill-white" />}
          </button>
          <div className="text-slate-900 text-sm text-center dark:text-slate-50">Don&apos;t have an account? <Link href={REGISTER_ROUTE} className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
          Sign  up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;

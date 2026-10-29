"use client"
import { getAuthToken, getAuthUser, signUp } from "@/api/auth";
import { LOGIN_ROUTE } from '@/app/constants/routes';
import Link from 'next/link';
import React from 'react'
import { useForm, } from 'react-hook-form';
import { useState } from 'react';
import Spinner from '@/app/component/Spinner';
import useAuthStore from '@/stores/authStores';

function Registerpage() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const registerUser = useAuthStore((state) => state.registerUser);

  async function submitForm(data) {
    setLoading(true);
    setAuthMessage("");
    try {
      const result = await signUp({
        name: data.name.trim(),
        email: data.email,
        password: data.password,
        phone: data.phone.trim(),
        address: {
          street: data.street.trim(),
          city: data.city.trim(),
        },
      });
      const token = getAuthToken(result);

      if (!token) {
        throw new Error('The registration API did not return an authentication token.');
      }

      registerUser({
        user: getAuthUser(result, { email: data.email }),
        token,
      });
    } catch (error) {
      setAuthMessage(
        error instanceof Error ? error.message : "Unable to register.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="container w-full ">
        <div className="flex w-full flex-col gap-8 overflow-hidden rounded-lg bg-white p-6 sm:p-8 dark:bg-neutral-800">
        <div>
          <div className="mb-5">
            <h2 className="text-slate-900 text-2xl font-bold dark:text-slate-50">Create your account</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sign up with a social account or use your email.</p>
          </div>
          
          <div className="mb-6">
            <h1 className="text-slate-900 text-2xl font-bold dark:text-slate-50">Sign up with email
            </h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
            <div>
              <label htmlFor="name" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Name</label>
              <input type="text" id="name" autoComplete="name" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" {...register("name", { required: "Enter your name." })} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
              <input type="email" id="email" name="email" placeholder="john@readymadeui.com" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" 
            {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Phone</label>
              <input type="tel" id="phone" name="phone" autoComplete="tel" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" {...register("phone", { required: "Enter your phone number." })} />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="street" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Street address</label>
              <input type="text" id="street" autoComplete="street-address" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" {...register("street", { required: "Enter your street address." })} />
              {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>}
            </div>
            <div>
              <label htmlFor="city" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">City</label>
              <input type="text" id="city" autoComplete="address-level2" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" {...register("city", { required: "Enter your city." })} />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>
              <input type="password" id="password" name="password" placeholder="••••••••" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
              {...register("password", { required: "Enter a password." })}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Confirm
                password</label>
              <input type="password" id="confirm-password" name="confirm-password" placeholder="••••••••" required className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
              {...register("confirm-password", {
                required: "Confirm your password.",
                validate: (value) => value === getValues("password") || "Passwords do not match.",
              })}
              />
              {errors["confirm-password"] && <p className="mt-1 text-sm text-red-600">{errors["confirm-password"].message}</p>}
            </div>
            <div className="flex items-start flex-wrap gap-2">
              <label className="flex items-center group has-[input:checked]:text-slate-900">
                <input id="tmc" type="checkbox" required className="sr-only" {...register("tmc")} />
                {/* Custom box */}
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-600
                        bg-white dark:bg-neutral-700
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
                  I accept the
                </span>
              </label>
              <a href="#" className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Terms and Conditions
              </a>
            </div>
            {authMessage && (
              <p role="alert" className="text-sm text-red-600">
                {authMessage}
              </p>
            )}
            <button type="submit" disabled={loading} className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-primary hover:bg-primary/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Creating account..." : "Create an account"}
              {loading && <Spinner className="w-4 h-4 ml-2 inline fill-white"/>}
              </button>
          </form>
          <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">Already have an account? <Link href={LOGIN_ROUTE} className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              Login here</Link>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Registerpage;

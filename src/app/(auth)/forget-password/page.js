"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LOGIN_ROUTE } from "@/app/constants/routes";

function ForgetPassword() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  function onValidSubmit() {
    setMessage(
      "Password reset requests are not connected to the server yet. No reset email has been sent.",
    );
  }

  return (
    <div className="w-full max-w-lg py-4">
      <div className="w-full rounded-lg p-6 md:p-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
            Forgot your password?
          </h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Enter your account email and we&apos;ll help you get back in.
          </p>
        </div>

        <form
          className="space-y-6"
          noValidate
          onSubmit={handleSubmit(onValidSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 inline-block text-sm font-medium text-slate-900 dark:text-slate-50"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="john@gmail.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-800 dark:text-slate-50 dark:outline-neutral-700"
              {...register("email", {
                required: "Enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {message && (
            <p role="alert" className="text-sm text-amber-700 dark:text-amber-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md border border-blue-600 bg-primary px-3.5 py-2 text-sm font-semibold tracking-wide text-white transition-all hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Send reset link
          </button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Remembered your password?{" "}
            <Link
              href={LOGIN_ROUTE}
              className="rounded font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as React from 'react';
//import { GoogleIcon, FacebookIcon } from './CustomIcons';

export default function Login() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    
    
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email?.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password?.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <section className="min-h-screen flex flex-col justify-between p-4 bg-gray-50 dark:bg-gray-900">

      <div className="max-w-md mx-auto w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
        {/* Logo */}
        <div className="flex justify-center"></div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Sign in
        </h1>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}>
          {error && <div className="text-white">{error}</div>}
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              required
              name="email"
              className={`w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
            />
            {emailError && (
              <p className="text-sm text-red-500 mt-1">{emailErrorMessage}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••"
              name="password"
              required
              className={`w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordErrorMessage}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input id="remember" name="remember" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
          Sign In
          </button>

            


          {/* Forgot Password */}
          <Link
            type="button"
            onClick={handleClickOpen}
            className="block text-sm text-blue-600 hover:underline text-center w-full"
            href="/"
          >
            Forgot your password?
          </Link>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 px-2">or</span>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 py-2 rounded-lg text-gray-700 dark:text-gray-300"
            onClick={() => alert('Sign in with Google')}
          >
            
            Sign in with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 py-2 rounded-lg text-gray-700 dark:text-gray-300"
            onClick={() => alert('Sign in with Facebook')}
          >
        
            Sign in with Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?
          <Link href="/register" className="text-blue-600 hover:underline pl-3">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};
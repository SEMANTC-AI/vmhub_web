// src/components/signup-form.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { IconSpinner } from './ui/icons';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Manrope } from 'next/font/google';

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      await signInWithPopup(auth, provider);
      toast.success('Account created successfully');
      router.refresh();
    } catch (error: any) {
      console.error('Error during Google sign up:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign up cancelled');
      } else {
        toast.error(error.message || 'Failed to sign up with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      toast.success('Account created successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to create account');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 space-y-3">
      <div className="w-full flex-1 border bg-white px-6 pb-4 pt-8 shadow-md md:w-96 dark:bg-zinc-950">
        {/* Email/Password Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="rounded border p-2 dark:bg-zinc-900 dark:border-zinc-700"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="rounded border p-2 dark:bg-zinc-900 dark:border-zinc-700"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`${manrope.className} h-10 w-full flex items-center justify-center gap-2 border bg-zinc-900 p-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50`}
          >
            {isLoading ? <IconSpinner className="animate-spin" /> : 'Sign up'}
          </button>
        </form>

        <div className="my-4 text-center text-zinc-500">or</div>

        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          type="button"
          className={`${manrope.className} flex h-10 w-full flex-row items-center justify-center gap-2 border bg-white p-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 dark:bg-zinc-950 dark:hover:bg-zinc-900`}
        >
          {isLoading ? (
            <IconSpinner className="animate-spin" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p className={`${manrope.className} mt-4 text-center text-sm text-zinc-500`}>
          By signing up, you agree to our{' '}
          <Link 
            href="/terms" 
            className={`${manrope.className} font-medium text-zinc-800 hover:underline dark:text-zinc-200`}
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link 
            href="/privacy" 
            className={`${manrope.className} font-medium text-zinc-800 hover:underline dark:text-zinc-200`}
          >
            Privacy Policy
          </Link>
        </p>
      </div>

      <Link href="/login" className="flex flex-row gap-1 text-sm text-zinc-400">
        <span className={manrope.className}>Already have an account?</span>{' '}
        <div className={`${manrope.className} font-semibold underline`}>Log in</div>
      </Link>
    </div>
  );
}
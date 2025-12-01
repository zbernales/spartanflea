"use client"; 
import { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth, } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Link from "next/link"; 

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      console.log('User logged in:', user);
      console.log('Logging in with:', email, password);
      window.location.href = '/';
    } catch (error) {
      alert(error);
      console.error('Error logging in user:', error.message);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Link href="/">
        <img className="mb-8" width="400" src="https://docs.google.com/drawings/d/e/2PACX-1vSoyGWRLYwYovMlLkiEwC9D3iWQDKVmiXFt_80xsv0721UmTsETuE1j2tsbpcqxrTsZ5EN9CDQzCuZo/pub?w=4320&h=864" alt="spartan flea logo" />
      </Link>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-black hover:text-blue-700"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className=" text-sm">
              <a
                href="/register"
                className="font-medium text-black hover:text-blue-700"
              >
                Don't have an account? 
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

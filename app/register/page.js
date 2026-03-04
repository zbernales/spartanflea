"use client"; 
import { useState } from 'react';
import { Auth, } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import Link from "next/link"; 
export default function Register() {
  const supabase = createClient('https://vmqznpcwtsjjsdtlrntb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtcXpucGN3dHNqanNkdGxybnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDA1MzcsImV4cCI6MjA3MzQ3NjUzN30.8ugu1MdH2Pk2EoqB-IUvRC2LLyzhYN-K9qbZmKJ4n58');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({ 
        email: email, 
        password: password,
        options: {
          data: {
            username: username
          }
        }
       });
      if (error) {
        throw error;
      }
      alert('Account successfully created!');
      console.log('Registration successful:', user);
      window.location.href = '/login';
    } catch (error) {
      alert(error);
      console.error('Error registering user:', error.message);
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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              Register
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
            <a
                href="/login"
                className="font-medium text-black hover:text-blue-700"
              >
                Already have an account? 
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

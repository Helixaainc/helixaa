// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaFacebookF, FaApple, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaShieldAlt, FaBolt, FaHandHoldingUsd } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {

      if (!email || !password) {
        setError('Email and password are required');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'An error occurred during login');
        setIsLoading(false);
        return;
      }

      // If login is successful, redirect to the home page or dashboard
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        user: JSON.stringify(data.user)
      });

      if (result?.error) {
        setError(result.error || 'Authentication failed');
        setIsLoading(false);
        return;
      }

      // Successful login - redirect handled by middleware
      if(result.ok){
        router.push("/");
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fadeInUp">
        {/* Brand Section */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-[#082C38] to-[#0c4457]  p-8 flex flex-col">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-helixaa-green flex items-center justify-center text-helixaa-blue font-bold text-2xl">
              P
            </div>
            <h1 className="text-2xl font-bold ml-3">PayLater</h1>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-helixaa-green">Welcome Back!</h2>
            <p className="text-helixaa-green/80 mb-10 text-helixaa-green">Sign in to access your account and continue your financial journey with PayLater.</p>
          </div>

          <div className="space-y-6 mt-auto">
            <div className="flex items-start bg-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/15">
              <div className="w-10 h-10 rounded-lg bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-helixaa-green mb-1">Secure Transactions</h3>
                <p className="text-sm text-gray-300">Bank-level security for all your financial activities.</p>
              </div>
            </div>

            <div className="flex items-start bg-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/15">
              <div className="w-10 h-10 rounded-lg bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                <FaBolt className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-helixaa-green mb-1">Instant Approval</h3>
                <p className="text-sm text-gray-300">Get credit decisions in seconds, not days.</p>
              </div>
            </div>

            <div className="flex items-start bg-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/15">
              <div className="w-10 h-10 rounded-lg bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                <FaHandHoldingUsd className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-helixaa-green text-lg mb-1">Flexible Payments</h3>
                <p className="text-sm text-gray-300">Choose payment plans that work for you.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-300 text-sm">
            © 2025 Helixaa. All rights reserved.
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-3/5 p-8 md:p-12">
          <div className="text-right mb-6">
            <span className="text-gray-500 text-sm">Don&apos;t have an account?</span>
            <button className="text-helixaa-blue font-medium ml-2 hover:underline">Sign Up</button>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-10 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
              <p className="text-gray-600">Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center animate-fadeInUp">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative border border-gray-300 rounded-lg overflow-hidden transition-all focus-within:border-helixaa-green focus-within:ring-2 focus-within:ring-helixaa-green/20">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button className="text-sm text-helixaa-blue hover:underline">Forgot Password?</button>
                </div>
                <div className="relative border border-gray-300 rounded-lg overflow-hidden transition-all focus-within:border-helixaa-green focus-within:ring-2 focus-within:ring-helixaa-green/20">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaLock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-helixaa-blue border-gray-300 rounded focus:ring-helixaa-blue"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-helixaa-blue text-white py-3 px-4 rounded-lg hover:bg-[#0c4457] transition-colors font-medium flex items-center justify-center disabled:opacity-75 animate-fadeInUp"
                style={{ animationDelay: '0.5s' }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="ml-2 animate-pulse w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            
          </div>

          <div className="mt-14 text-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <div className="flex justify-center space-x-4 mb-4">
              <button className="text-gray-500 hover:text-helixaa-blue">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-helixaa-blue">
                <FaFacebookF />
              </button>
              <button className="text-gray-500 hover:text-helixaa-blue">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-helixaa-blue">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500 text-sm">Need help? <button className="text-helixaa-blue hover:underline">Contact Support</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}
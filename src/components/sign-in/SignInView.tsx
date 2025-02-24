import React from 'react';
import { SignInViewProps } from './SignInController';

export const SignInView: React.FC<SignInViewProps> = ({
  credentials,
  errors,
  isLoading,
  handleChange,
  handleBlur,
  handleSubmit,
}) =>
  (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Sign In
          </h1>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                value={credentials.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`py-3 px-4 block w-full border rounded-lg text-sm focus:ring-blue-500 ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                value={credentials.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <span
                    className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full"/>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
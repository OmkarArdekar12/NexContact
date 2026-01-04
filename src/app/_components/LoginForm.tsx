"use client";
import React, { useActionState } from "react";
import { loginAction } from "../actions/auth";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="space-x-4">
      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
        />
      </div>
      <div className="w-full mt-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600 my-1">{state.error}</p>
      )}
      <button
        type="submit"
        className="mt-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

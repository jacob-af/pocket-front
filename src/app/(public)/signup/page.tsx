"use client";

import * as React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { SIGNUP } from "@/graphql/mutations/auth";
import { signIn } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

type SignUpInputs = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpSide() {
  const [newUser, feedback] = useMutation(SIGNUP);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpInputs> = async ({
    email,
    userName,
    password,
    confirmPassword
  }) => {
    const { data: data } = await newUser({
      variables: {
        createUserInput: {
          email,
          password,
          userName
        }
      }
    });
    console.log(data, "data");
    const res = await signIn("credentials", {
      email: email,
      password,
      redirect: false
    });
    console.log(res);
    router.push("/db");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="userName"
              type="text"
              placeholder="User Name"
              {...register("userName", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9_-]{3,32}$/,
                  message: "Invalid user name"
                }
              })}
            />
            {errors?.userName && (
              <p className="text-xs italic text-red-500">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors?.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,32}$/,
                  message: "Password must be extra fancy"
                }
              })}
            />
            {errors?.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Password and Confirm Password fields */}

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="confirmPassword"
              type="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,32}$/,
                  message: "Password must be extra fancy"
                }
              })}
            />
            {errors?.confirmPassword && (
              <p className="text-xs italic text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Create Account
          </button>
          {/* Login link */}
          <Link
            href="login"
            className="mt-4 block text-blue-500 hover:text-blue-700"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "@/app/graphql/mutations/auth";
import { signIn } from "next-auth/react";
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
  console.log(errors, "errorss");
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <p className="text-red-500 text-xs italic">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Password and Confirm Password fields */}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Account
          </button>
          {/* Login link */}
          <Link
            href="login"
            className="block mt-4 text-blue-500 hover:text-blue-700"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

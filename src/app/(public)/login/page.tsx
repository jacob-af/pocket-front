"use client";

import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  getSession,
  signIn,
  useSession
} from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LogIn() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
    if (session?.user) {
      router.push("/db");
    }
  }, [router, session?.user]);

  const onSubmit: SubmitHandler<LoginInputs> = async ({ email, password }) => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
      console.log(res);
      if (res?.ok) {
        router.push("/db");
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignIn = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    signIn(id, { callbackUrl: "/db" });
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-screen w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
          <div className="text-justify">
            Warning: in development, server may take up to 1 minute to spin up.
            Google Sign in available for alpha-test users only.
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
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
                required: "Email is required",
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
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
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
          <div>
            <button
              type="submit"
              className="text-primary group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Sign in
            </button>
            <br />
            {providers &&
              Object.values(providers).map(provider => {
                if (provider.name === "Credentials") return null;
                return (
                  <div key={provider.name}>
                    <button
                      className="text-primary group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={event => googleSignIn(event, provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                );
              })}
          </div>
        </form>
      </div>
    </div>
  );
}

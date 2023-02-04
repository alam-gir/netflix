import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useAuth } from "@/hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, loading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex w-screen h-screen flex-col bg-black md:justify-center md:items-center md:bg-transparent">
      <Head>
        <title>Netflix | Login</title>
      </Head>
      <Image
        src="https:/rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt=""
      />
      <img
        src="logo.png"
        alt=""
        className="absolute left-4 top-4 h-12 w-12 object-cover"
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl capitalize font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="email-input" className="inline-block w-full">
            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 py-1 ml-1">
                Email is required
              </p>
            )}
          </label>
          <label htmlFor="password-input" className="inline-block w-full">
            <input
              type="password"
              name="password"
              id="password-input"
              placeholder="Type Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="font-sm text-red-500 py-1 ml-1">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semi capitalize"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="capitalize text-[gray]">
          New to netflix ?
          <button
            className="capitalize text-white hover:underline ml-2"
            onClick={() => setLogin(false)}
          >
            sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

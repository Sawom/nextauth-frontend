"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; 
import { useState } from "react";


export type FormEmail = {
  email: string;
};

const ForgetPassPage = () => {
    const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEmail>();

  const router = useRouter();

  const onSubmit = async (data: FormEmail) => {

  }


  return (
    <div className="my-10 w-[60%] mx-auto">
      <h1 className="text-center text-4xl mb-5 font-bold">
        Enter your <span className="text-teal-500"> Email </span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassPage;

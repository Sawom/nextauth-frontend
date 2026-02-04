"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //   token taken from url
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (!token) {
      Swal.fire("Error", "Token is missing!", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            newPassword: data.newPassword,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire("Success", "Password updated successfully!", "success");
        router.push("/login"); // if password changed then redirect to login
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to connect to server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center text-teal-600">
          Reset Password
        </h2>
        <p className="text-sm text-center text-gray-500">
          Enter your new secure password below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "Password is required",
                minLength: 6,
              })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="••••••••"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                Minimum 6 characters required
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.confirmPassword as any).message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-bold text-white rounded-md ${loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"}`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

import React, { useState } from "react";
import axiosInstance from "../../../../api/axios";
import endPoints from "../../../../api/endpoints";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        endPoints.auth.forgetPassword,
        { email }
      );

      console.log(res.data);

      if (res.data.status) {
        Swal.fire({
          title: "Success",
          text: "Reset link sent to email",
          icon: "success",
        });
      }

    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong",
        icon: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-5"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
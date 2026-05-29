import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axios";

const ResetPassword = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${id}/${token}`,
        data
      );

      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password Reset Successfully",
        });

        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Reset Password Failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={data.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={data.confirm_password}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-5"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
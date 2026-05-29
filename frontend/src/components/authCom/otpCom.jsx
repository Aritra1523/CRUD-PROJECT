import React from "react";

export const OtpCom = ({
  handleSubmit,
  handleChange,
  apiError,
  data,
  error,
  loading,
}) => {
  return (
    <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4">
    
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100"
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Verify OTP
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Enter the 6-digit verification code sent to your email
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3 mb-6">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data.otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            className="
              w-14 h-14
              text-center
              text-2xl
              font-bold
              rounded-xl
              border border-gray-300
              outline-none
              transition-all duration-300
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-200
              hover:border-blue-400
              shadow-sm
            "
          />
        ))}
      </div>

      {/* Error */}
      {error?.otp && (
        <p className="text-red-500 text-sm text-center mb-3">
          {error.otp}
        </p>
      )}

      {/* API Error */}
      {apiError && (
        <p className="text-red-500 text-sm text-center mb-4">
          {apiError}
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          font-semibold
          shadow-lg
          hover:shadow-blue-300
          hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-300
        "
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* Resend */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Didn’t receive the code?{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
          Resend OTP
        </span>
      </p>
    </form>
  </div>
</>
  );
};

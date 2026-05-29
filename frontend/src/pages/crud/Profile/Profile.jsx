import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axios";
import endPoints from "../../../../api/endpoints";
import Swal from "sweetalert2";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(
        endPoints.auth.profile,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log("res.data", res.data);

      // FIXED HERE
      if (res.data.status) {
        setProfile(res.data.data);
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Profile Fetch Failed"
      );

      Swal.fire({
        title: "Error!",
        text: "Unable to load profile",
        icon: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 flex items-center justify-center px-4 py-10">

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        {/* Header */}
        <div className="text-center mb-8">

          {/* Profile Image */}
          {profile?.imagePath ? (
            <img
              src={`http://localhost:4000/${profile.imagePath}`}
              alt="profile"
              className="
                w-24
                h-24
                rounded-full
                object-cover
                border-4
                border-blue-500
                mx-auto
                mb-4
              "
            />
          ) : (
            <div
              className="
                w-24
                h-24
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                text-3xl
                font-bold
                mx-auto
                mb-4
              "
            >
              {profile?.name?.charAt(0)}
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            User Information
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Profile Data */}
        {profile && (
          <div className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-500">
                Name
              </label>

              <div className="mt-1 text-lg font-semibold text-gray-800">
                {profile.name}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">
                Email
              </label>

              <div className="mt-1 text-lg font-semibold text-gray-800">
                {profile.email}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm text-gray-500">
                Address
              </label>

              <div className="mt-1 text-lg font-semibold text-gray-800">
                {profile.address || "No Address"}
              </div>
            </div>

            {/* User ID */}
            <div>
              <label className="text-sm text-gray-500">
                User ID
              </label>

              <div className="mt-1 text-sm break-all text-gray-700">
                {profile._id}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
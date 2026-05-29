import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axios";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Fetch Single Post
  const fetchPost = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(
        `/api/post/${id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log(res.data);

      if (res.data.status) {
        setPost(res.data.data);
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch post"
      );

      Swal.fire({
        title: "Error!",
        text: "Unable to load post details",
        icon: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 py-10 px-4">
      
      <div
        className="
          max-w-3xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
          border
          border-gray-100
        "
      >
        
        {/* Heading */}
        <div className="mb-8 text-center">
          
          <h1 className="text-4xl font-bold text-gray-800">
            Post Details
          </h1>

          <p className="text-gray-500 mt-2">
            View complete post information
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        {/* Post Data */}
        {post && (
          <>
            {/* Title */}
            <div className="mb-6">
              
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Title
              </h2>

              <p className="text-3xl font-bold text-gray-800 mt-2">
                {post.title}
              </p>
            </div>

            {/* Subtitle */}
            <div className="mb-6">
              
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Subtitle
              </h2>

              <p className="text-lg text-gray-700 mt-2">
                {post.subtitle}
              </p>
            </div>

            {/* Content */}
            <div className="mb-6">
              
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Content
              </h2>

              <p className="text-gray-700 leading-8 mt-2">
                {post.content}
              </p>
            </div>

            {/* ID */}
            <div className="mb-8">
              
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Post ID
              </h2>

              <p className="text-gray-600 mt-2 break-all">
                {post._id}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              
              <button
                onClick={() =>
                  navigate(`/product/update/${post._id}`)
                }
                className="
                  flex-1
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                "
              >
                Edit Post
              </button>

              <button
                onClick={() => navigate("/product/list")}
                className="
                  flex-1
                  bg-gray-200
                  hover:bg-gray-300
                  text-gray-800
                  py-3
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                "
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axios";
import Swal from "sweetalert2";

const ProductUpdate = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  
  // FETCH SINGLE POST DETAILS
  
  const fetchPostDetails = async () => {
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

    // console.log("details", res.data);

    if (res.data.status) {
      setData({
        title: res.data.data.title || "",
        subtitle: res.data.data.subtitle || "",
        content: res.data.data.content || "",
      });
    }

  } catch (error) {
    console.log(error);

    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Unable to fetch details",
      icon: "error",
    });

  } finally {
    setLoading(false);
  }
};

  // Load data on page open
  useEffect(() => {
    fetchPostDetails();
  }, []);


  // HANDLE CHANGE

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  
  // HANDLE UPDATE
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axiosInstance.put(
        `/api/post/update/${id}`,
        data,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log(res.data);

      if (res.data.status) {
        await Swal.fire({
          title: "Updated!",
          text: "Post Updated Successfully",
          icon: "success",
        });

        navigate("/product/list");
      }

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Update Failed"
      );

      Swal.fire({
        title: "Oops",
        text: "Something went wrong",
        icon: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 py-10">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Update Post
          </h1>

          <p className="text-gray-500 mt-2">
            Edit your post information
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-5 text-sm">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>

          <input
            type="text"
            name="subtitle"
            value={data.subtitle}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>

          <textarea
            name="content"
            rows="6"
            value={data.content}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
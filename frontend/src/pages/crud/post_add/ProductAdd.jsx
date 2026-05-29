import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductValidator } from "../../../validators/postValidator";
import { useForm } from "react-hook-form";
import useAddPost from "../../../../customHooks/crud/useAddPost";
import endPoints from "../../../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
const ProductAdd = () => {
  const { addPost, loading, error } = useAddPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductValidator),
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // postData(data);
    const res = await addPost(data);
    console.log("res", res);
    if (res?.status) {
      const result = await Swal.fire({
        title: "Success!",
        text: "Post Created Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (result.isConfirmed) {
        navigate("/product/list");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 py-10">

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="
      w-full
      max-w-2xl
      bg-white
      rounded-3xl
      shadow-2xl
      p-8
      border
      border-gray-100
    "
  >
    
    {/* Heading */}
    <div className="text-center mb-8">
      
      <h2 className="text-3xl font-bold text-gray-800">
        Create New Post
      </h2>

      <p className="text-gray-500 mt-2">
        Share your thoughts with the community
      </p>
    </div>

    {/* Title */}
    <div className="mb-5">
      
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Post Title
      </label>

      <input
        {...register("title")}
        type="text"
        placeholder="Enter post title"
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          outline-none
          focus:ring-4
          focus:ring-blue-200
          focus:border-blue-500
          transition-all
          duration-300
        "
      />

      <span className="text-red-500 text-sm mt-1 block">
        {errors?.title?.message}
      </span>
    </div>

    {/* Subtitle */}
    <div className="mb-5">
      
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subtitle
      </label>

      <input
        {...register("subtitle")}
        type="text"
        placeholder="Enter subtitle"
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          outline-none
          focus:ring-4
          focus:ring-blue-200
          focus:border-blue-500
          transition-all
          duration-300
        "
      />

      <span className="text-red-500 text-sm mt-1 block">
        {errors?.subtitle?.message}
      </span>
    </div>

    {/* Content */}
    <div className="mb-6">
      
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Content
      </label>

      <textarea
        {...register("content")}
        rows="6"
        placeholder="Write your content..."
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          outline-none
          resize-none
          focus:ring-4
          focus:ring-blue-200
          focus:border-blue-500
          transition-all
          duration-300
        "
      />

      <span className="text-red-500 text-sm mt-1 block">
        {errors?.content?.message}
      </span>
    </div>

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
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      Submit Post
    </button>
  </form>
</div>
    </>
  );
};

export default ProductAdd;

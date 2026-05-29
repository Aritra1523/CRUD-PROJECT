import React from "react";
import { Eye } from "lucide-react";
const PostCard = ({ item, loggedInUserId, handleDelete, navigate }) => {
  return (
    <div
      className="
    bg-white
    rounded-3xl
    shadow-lg
    hover:shadow-2xl
    transition-all
    duration-300
    border
    border-gray-100
    overflow-hidden
    hover:-translate-y-2
  "
    >
      {/* Top Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold break-words">{item.title}</h2>

          <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
            #{item._id.slice(0, 6)}
          </span>
        </div>

        <p className="text-blue-100 mt-2 text-sm">{item.subtitle}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-600 leading-relaxed line-clamp-4">
          {item.content}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          {/* Edit */}
          <button
            onClick={() => navigate(`/product/update/${item._id}`)}
            className="
          flex-1
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2.5
          rounded-xl
          font-medium
          transition-all
          duration-300
          hover:scale-105
          shadow-md
        "
          >
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(item._id)}
            className="
          flex-1
          bg-red-500
          hover:bg-red-600
          text-white
          py-2.5
          rounded-xl
          font-medium
          transition-all
          duration-300
          hover:scale-105
          shadow-md
        "
          >
            Delete
          </button>
         

<button
  onClick={() => navigate(`/product/details/${item._id}`)}
  className="
    flex-1
    bg-blue-600
    hover:bg-blue-700
    text-white
    py-2.5
    rounded-xl
    font-medium
    transition-all
    duration-300
    hover:scale-105
    shadow-md
    flex
    items-center
    justify-center
    gap-0.5
  "
>
  
  View Details
  <Eye size={18} />
</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

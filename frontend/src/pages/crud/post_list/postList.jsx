// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axiosInstance from "../../../../api/axios";
// import usePostList from "../../../../customHooks/crud/usePostList";
// import PostCard from "../../../components/crudCom/PostList";
// import Swal from "sweetalert2";

// const PostList = () => {
//   const navigate = useNavigate();

//   const { products, loading, error, fetchProducts } = usePostList();

//   const loggedInUserId = localStorage.getItem("userId");

//   // Dynamic User Data
//   const userName = localStorage.getItem("name");
//   const userImage =
//     localStorage.getItem("image") ||
//     "https://i.pravatar.cc/150?img=12";

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You want to delete this post?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axiosInstance.delete(`/api/delete/${id}`, {
//           headers: {
//             "x-access-token": token,
//           },
//         });

//         if (res.data.status) {
//           Swal.fire({
//             title: "Deleted!",
//             text: "Post Deleted Successfully",
//             icon: "success",
//           });

//           fetchProducts();
//         }
//       } catch (error) {
//         console.log(error);

//         Swal.fire({
//           title: "Error!",
//           text: "Delete Failed",
//           icon: "error",
//         });
//       }
//     } else {
//       Swal.fire({
//         title: "Cancelled",
//         text: "Your post is safe 🙂",
//         icon: "info",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">
        
//         {/* Navbar */}
//         <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          
//           {/* Left */}
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Post Dashboard
//             </h1>

//             <p className="text-sm text-gray-500">
//               Manage and create your posts
//             </p>
//           </div>

//           {/* Right */}
//           <div className="flex items-center gap-4">
            
//             {/* Add Post */}
//             <Link
//               to="/product/create"
//               className="
//                 bg-blue-600
//                 hover:bg-blue-700
//                 text-white
//                 px-5
//                 py-2.5
//                 rounded-xl
//                 font-medium
//                 shadow-lg
//                 hover:shadow-blue-300
//                 transition-all duration-300
//                 hover:scale-105
//               "
//             >
//               + Add Post
//             </Link>

//             {/* Profile */}
//             <div
//               onClick={() => navigate("/profile")}
//               className="
//                 flex
//                 items-center
//                 gap-3
//                 bg-slate-100
//                 px-3
//                 py-2
//                 rounded-xl
//                 shadow-sm
//                 cursor-pointer
//                 hover:bg-slate-200
//                 transition-all
//                 duration-300
//               "
//             >
//               <img
//                 src={userImage}
//                 alt="profile"
//                 className="
//                   w-11
//                   h-11
//                   rounded-full
//                   border-2
//                   border-blue-500
//                   object-cover
//                 "
//               />

//               <div>
//                 <h3 className="font-semibold text-gray-800">
//                   {userName || "User"}
//                 </h3>

//                 <p className="text-xs text-gray-500">
//                   View Profile
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="max-w-7xl mx-auto px-5 py-10">
          
//           {/* Loading */}
//           {loading && (
//             <div className="flex justify-center items-center py-20">
//               <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <div className="bg-red-100 text-red-600 p-4 rounded-xl text-center mb-6">
//               {error}
//             </div>
//           )}

//           {/* Posts */}
//           {!loading && products.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
//               {products.map((item) => (
//                 <PostCard
//                   key={item._id}
//                   item={item}
//                   loggedInUserId={loggedInUserId}
//                   handleDelete={handleDelete}
//                   navigate={navigate}
//                 />
//               ))}
//             </div>
//           ) : (
//             !loading && (
//               <div className="flex flex-col items-center justify-center py-20">
                
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
//                   alt="empty"
//                   className="w-40 mb-5 opacity-80"
//                 />

//                 <h2 className="text-2xl font-bold text-gray-700">
//                   No Posts Found
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                   Start by creating your first post
//                 </p>

//                 <Link
//                   to="/product/create"
//                   className="
//                     mt-6
//                     bg-blue-600
//                     hover:bg-blue-700
//                     text-white
//                     px-6
//                     py-3
//                     rounded-xl
//                     font-medium
//                     transition-all duration-300
//                     hover:scale-105
//                   "
//                 >
//                   Create Post
//                 </Link>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostList;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axios";
import usePostList from "../../../../customHooks/crud/usePostList";
import PostCard from "../../../components/crudCom/PostList";
import Swal from "sweetalert2";

const PostList = () => {
  const navigate = useNavigate();

  const { products, loading, error, fetchProducts } = usePostList();

  const [showDropdown, setShowDropdown] = useState(false);

  const loggedInUserId = localStorage.getItem("userId");

  // Dynamic User Data
  const userName = localStorage.getItem("name");

  const userImage =
    localStorage.getItem("image") ||
    "https://i.pravatar.cc/150?img=12";

  // Logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      localStorage.removeItem("image");

      Swal.fire({
        title: "Logged Out",
        text: "You have been logged out successfully",
        icon: "success",
      });

      navigate("/auth/login");
    }
  };

  // Delete Post
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        const res = await axiosInstance.delete(`/api/delete/${id}`, {
          headers: {
            "x-access-token": token,
          },
        });

        if (res.data.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Post Deleted Successfully",
            icon: "success",
          });

          fetchProducts();
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          title: "Error!",
          text: "Delete Failed",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "Your post is safe 🙂",
        icon: "info",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200">

        {/* Navbar */}
        <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">

          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Post Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Manage and create your posts
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Add Post */}
            <Link
              to="/product/create"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2.5
                rounded-xl
                font-medium
                shadow-lg
                hover:shadow-blue-300
                transition-all duration-300
                hover:scale-105
              "
            >
              + Add Post
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">

              {/* Profile Button */}
              <div
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
                className="
                  flex
                  items-center
                  gap-3
                  bg-slate-100
                  px-3
                  py-2
                  rounded-xl
                  shadow-sm
                  cursor-pointer
                  hover:bg-slate-200
                  transition-all
                  duration-300
                "
              >
                <img
                  src={userImage}
                  alt="profile"
                  className="
                    w-11
                    h-11
                    rounded-full
                    border-2
                    border-blue-500
                    object-cover
                  "
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {userName || "User"}
                  </h3>

                  <p className="text-xs text-gray-500">
                    View Options
                  </p>
                </div>
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-44
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                    z-50
                  "
                >
                  {/* Profile */}
                  <button
                    onClick={() => navigate("/profile")}
                    className="
                      w-full
                      text-left
                      px-5
                      py-3
                      hover:bg-slate-100
                      transition-all
                      duration-200
                      text-gray-700
                      font-medium
                    "
                  >
                    👤 Profile
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      text-left
                      px-5
                      py-3
                      hover:bg-red-100
                      transition-all
                      duration-200
                      text-red-600
                      font-medium
                    "
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-5 py-10">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-xl text-center mb-6">
              {error}
            </div>
          )}

          {/* Posts */}
          {!loading && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {products.map((item) => (
                <PostCard
                  key={item._id}
                  item={item}
                  loggedInUserId={loggedInUserId}
                  handleDelete={handleDelete}
                  navigate={navigate}
                />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="flex flex-col items-center justify-center py-20">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                  alt="empty"
                  className="w-40 mb-5 opacity-80"
                />

                <h2 className="text-2xl font-bold text-gray-700">
                  No Posts Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Start by creating your first post
                </p>

                <Link
                  to="/product/create"
                  className="
                    mt-6
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                    transition-all duration-300
                    hover:scale-105
                  "
                >
                  Create Post
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default PostList;
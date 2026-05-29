import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import endPoints from "../../api/endpoints";

const usePostList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axiosInstance.get(
        endPoints.auth.list,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);

      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
};

export default usePostList;
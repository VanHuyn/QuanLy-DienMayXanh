import React, { createContext, useContext, useState } from "react";
import RatingService from "../services/ratingService";

const RatingContext = createContext();

export const useRating = () => useContext(RatingContext);

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy đánh giá của sản phẩm
  const fetchRatings = async (productId) => {
    setLoading(true);
    try {
      const res = await RatingService.getByProduct(productId);
      if (res.success) setRatings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Tạo đánh giá mới
  const createRating = async (data) => {
    setLoading(true);
    try {
      const res = await RatingService.create(data);
      if (res.success) {
        // thêm đánh giá mới vào state
        setRatings((prev) => [res.data, ...prev]);
      }
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <RatingContext.Provider
      value={{ ratings, loading, fetchRatings, createRating }}
    >
      {children}
    </RatingContext.Provider>
  );
};

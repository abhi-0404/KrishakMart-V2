import API from './api';

export interface Review {
  _id: string;
  productId: string;
  farmerId: { _id: string; name: string } | string;
  farmerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddReviewData {
  rating: number;
  comment: string;
}

export const addReview = async (productId: string, reviewData: AddReviewData) => {
  const { data } = await API.post(`/reviews/${productId}`, reviewData);
  return data.data;
};

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data } = await API.get(`/reviews/${productId}`);
  return data.data;
};

export const checkCanReview = async (productId: string): Promise<{
  canReview: boolean;
  hasPurchased: boolean;
  alreadyReviewed: boolean;
}> => {
  try {
    const { data } = await API.get(`/reviews/${productId}/can-review`);
    return data.data;
  } catch {
    return { canReview: false, hasPurchased: false, alreadyReviewed: false };
  }
};

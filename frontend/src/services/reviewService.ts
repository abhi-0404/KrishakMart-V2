import API from './api';

export interface Review {
  _id: string;
  productId: string;
  farmerId: {
    _id: string;
    name: string;
  };
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

// Add review for a product
export const addReview = async (productId: string, reviewData: AddReviewData) => {
  try {
    const { data } = await API.post(`/reviews/${productId}`, reviewData);
    return data.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Get reviews for a product
export const getProductReviews = async (productId: string) => {
  try {
    const { data } = await API.get(`/reviews/${productId}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

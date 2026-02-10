// Helper function to get the correct image URL
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) {
    return '/placeholder-product.svg';
  }
  
  // If it's already a full URL (Cloudinary, etc.)
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a local path, construct the full URL
  const backendUrl = 'http://localhost:5000';
  return `${backendUrl}${imagePath}`;
};

// Helper function to get the first image from an images array
export const getFirstImage = (images: string[] | undefined): string => {
  if (!images || images.length === 0) {
    return '/placeholder-product.svg';
  }
  
  return getImageUrl(images[0]);
};
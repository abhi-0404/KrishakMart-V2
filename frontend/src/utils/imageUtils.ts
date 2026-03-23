const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '/placeholder-product.svg';

  // Already a full URL (Cloudinary, http, https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Local upload path — ensure leading slash
  const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${BACKEND_URL}${normalized}`;
};

export const getFirstImage = (images: string[] | undefined): string => {
  if (!images || images.length === 0) return '/placeholder-product.svg';
  return getImageUrl(images[0]);
};

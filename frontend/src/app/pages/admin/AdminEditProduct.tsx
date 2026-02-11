import React from 'react';
import { ShopOwnerEditProduct } from '../shop-owner/ShopOwnerEditProduct';

export const AdminEditProduct: React.FC = () => {
  return <ShopOwnerEditProduct returnPath="/admin/my-products" />;
};

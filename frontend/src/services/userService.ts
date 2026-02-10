import API from './api';

export interface Address {
  _id?: string;
  label: string;
  fullAddress: string;
  village?: string;
  district?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  isDefault: boolean;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  shopName?: string;
  shopAddress?: string;
  shopDescription?: string;
  gstNumber?: string;
}

// Update user profile
export const updateProfile = async (profileData: UpdateProfileData) => {
  try {
    console.log('userService: Sending profile update request with data:', profileData);
    const { data } = await API.put('/users/profile', profileData);
    console.log('userService: Received response:', data);
    return data.data;
  } catch (error: any) {
    console.error('userService: Error updating profile:', error);
    console.error('userService: Error response:', error.response);
    throw error;
  }
};

// Add delivery address
export const addAddress = async (address: Address) => {
  try {
    const { data } = await API.post('/users/addresses', address);
    return data.data;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

// Update delivery address
export const updateAddress = async (addressId: string, address: Address) => {
  try {
    const { data } = await API.put(`/users/addresses/${addressId}`, address);
    return data.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// Delete delivery address
export const deleteAddress = async (addressId: string) => {
  try {
    const { data } = await API.delete(`/users/addresses/${addressId}`);
    return data.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

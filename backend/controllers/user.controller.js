import User from '../models/User.model.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email, shopName, shopAddress, shopDescription, gstNumber } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    
    if (user.role === 'shopOwner') {
      if (shopName) user.shopName = shopName;
      if (shopAddress) user.shopAddress = shopAddress;
      if (shopDescription) user.shopDescription = shopDescription;
      if (gstNumber) user.gstNumber = gstNumber;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add delivery address
// @route   POST /api/users/addresses
// @access  Private (Farmer)
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // If this is the first address or marked as default, set it as default
    if (user.addresses.length === 0 || req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
      req.body.isDefault = true;
    }

    user.addresses.push(req.body);
    await user.save();

    res.json({
      success: true,
      message: 'Address added successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update delivery address
// @route   PUT /api/users/addresses/:addressId
// @access  Private (Farmer)
export const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    Object.assign(address, req.body);

    if (req.body.isDefault) {
      user.addresses.forEach(addr => {
        if (addr._id.toString() !== req.params.addressId) {
          addr.isDefault = false;
        }
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete delivery address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private (Farmer)
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.addresses = user.addresses.filter(
      addr => addr._id.toString() !== req.params.addressId
    );

    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

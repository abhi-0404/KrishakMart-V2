import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, QrCode, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner';
import { createOrder } from '../../services/orderService';

export const CheckoutPage: React.FC = () => {
  const { cart, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'QR'>('COD');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: user?.name || '',
    mobile: user?.phone || '',
    village: '',
    district: '',
    state: '',
    pincode: '',
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.name || !address.mobile || !address.village) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!user) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);

      // Prepare order data
      const orderData = {
        products: cart.map(item => ({
          productId: item.product._id || item.product.id,
          quantity: item.quantity
        })),
        deliveryAddress: {
          fullAddress: `${address.name}, ${address.village}${address.district ? ', ' + address.district : ''}${address.state ? ', ' + address.state : ''}${address.pincode ? ' - ' + address.pincode : ''}`,
          village: address.village,
          district: address.district,
          state: address.state,
          pincode: address.pincode,
          phone: address.mobile
        },
        paymentMethod
      };

      // Create order via API
      await createOrder(orderData);
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/farmer/orders');
    } catch (error: any) {
      console.error('Order placement error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-base">Full Name *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      placeholder="Enter your name"
                      className="mt-2 text-base py-6 border-2 border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile" className="text-base">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={address.mobile}
                      onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
                      placeholder="Enter 10-digit mobile number"
                      className="mt-2 text-base py-6 border-2 border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="village" className="text-base">Village / Location *</Label>
                    <Input
                      id="village"
                      value={address.village}
                      onChange={(e) => setAddress({ ...address, village: e.target.value })}
                      placeholder="Enter village name"
                      className="mt-2 text-base py-6 border-2 border-gray-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district" className="text-base">District</Label>
                      <Input
                        id="district"
                        value={address.district}
                        onChange={(e) => setAddress({ ...address, district: e.target.value })}
                        placeholder="District"
                        className="mt-2 text-base py-6 border-2 border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-base">State</Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        placeholder="State"
                        className="mt-2 text-base py-6 border-2 border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-base">Pincode</Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="Enter 6-digit pincode"
                      className="mt-2 text-base py-6 border-2 border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="COD" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-lg">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when you receive</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="UPI" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Smartphone className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-lg">UPI Payment</div>
                          <div className="text-sm text-gray-600">PhonePe, Google Pay, Paytm</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer">
                      <RadioGroupItem value="QR" id="qr" />
                      <Label htmlFor="qr" className="flex items-center gap-3 cursor-pointer flex-1">
                        <QrCode className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-lg">QR Code Payment</div>
                          <div className="text-sm text-gray-600">Scan and pay</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t-2 border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery:</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-gray-800">
                    <span>Total:</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || cart.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Place Order
                    </>
                  )}
                </Button>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700 text-center">
                    ✓ Secure Checkout<br />
                    ✓ Fast Delivery<br />
                    ✓ Easy Returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-xl text-gray-600 mb-8">Add some farming supplies to get started!</p>
            <Link to="/shop">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2">
                <ShoppingBag className="h-5 w-5" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="text-sm font-medium text-green-600">{item.product.brand}</div>
                      <h3 className="text-xl font-bold text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.shopOwner}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-700">₹{item.product.price}</div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border-2 border-green-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="hover:bg-green-50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-1 font-bold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="hover:bg-green-50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            removeFromCart(item.product.id);
                            toast.success('Item removed from cart');
                          }}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm text-gray-600">Subtotal: </span>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({cart.length}):</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery:</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total:</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 gap-3"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  ✓ 100% Genuine Products<br />
                  ✓ Free Delivery Available<br />
                  ✓ Cash on Delivery Option
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

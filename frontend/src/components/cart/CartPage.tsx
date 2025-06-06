import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const subtotal = getSubtotal();
  const shippingCost = items.length > 0 ? 10 : 0;
  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (couponCode.toLowerCase() === 'discount5') {
        setDiscount(5);
      } else if (couponCode.toLowerCase() === 'discount10') {
        setDiscount(10);
      } else {
        setDiscount(0);
        alert('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items Table */}
        <div className="lg:w-2/3">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">S. No.</th>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">Product Image</th>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">Product Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">Unit Price</th>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">Quantity</th>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">Total</th>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-white">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-contain" />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{item.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-16 text-center"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Coupon Code */}
          <div className="bg-gray-800 rounded-lg mt-6 p-4 flex items-center">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 flex-1 text-white"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || !couponCode}
              className={`ml-4 px-4 py-2 rounded text-white ${
                isApplyingCoupon || !couponCode
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isApplyingCoupon ? 'Applying...' : 'Apply Coupon'}
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-center">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-300">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-300">Discount ({discount}%)</span>
                  <span className="font-medium text-red-400">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-300">Shipping</span>
                <span className="font-medium">${shippingCost.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-bold">Grand Total</span>
                <span className="font-bold">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded text-center font-medium">
              Proceed To Checkout
            </button>
            
            <Link to="/products" className="mt-4 block text-center text-green-500 hover:text-green-400">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

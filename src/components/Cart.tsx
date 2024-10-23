import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CheckoutForm } from './CheckoutForm';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 py-4 border-b">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                    className="border rounded p-1"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <div className="text-xl font-bold mb-4">
              Total: ${total.toFixed(2)}
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      {isCheckoutOpen && <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
};
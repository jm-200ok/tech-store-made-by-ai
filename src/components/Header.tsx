import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useStore();

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">TechStore</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.firstName}!</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </header>
  );
};
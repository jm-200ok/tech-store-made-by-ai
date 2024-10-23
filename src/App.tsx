import React from 'react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { products } from './data/products';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
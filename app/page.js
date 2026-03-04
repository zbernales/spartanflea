"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import MainLayout from './layouts/MainLayout.js'
import Product from './components/Product.js';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    async function checkUser() {
    const supabase = createClientComponentClient();
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) {
      setLoggedIn(false);
    }
  }
  checkUser();
}, []);
  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClientComponentClient();
      const {data: {user}} = await supabase.auth.getUser()

      // Fetch products from the database
      const { data, error } = await supabase.from('productlisting').select('*');

      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
        <MainLayout>
            <div className="max-w-[1200px] mx-auto">
              <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>
              <div className="grid grid-cols-5 gap-4">
                {products.map(product => (
                  <Product key={product.listingid} product={product} />
                ))}
            </div>
          </div>
        </MainLayout>
    </>
  )
    
}

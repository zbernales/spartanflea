"use client"
import {Alfa_Slab_One} from 'next/font/google'; 
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth, } from '@supabase/auth-ui-react';
import MainLayout from './layouts/MainLayout.js'
import Product from './components/Product.js';
import Link from 'next/link';
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
      // Initialize Supabase client
      const supabase = createClientComponentClient();
      const {data: {user}} = await supabase.auth.getUser()
      if (!user) {
        // Render a link to the login page
        return (
            <div>
                <p>You are not logged in. Please <Link href="/login"><a>log in</a></Link>.</p>
            </div>
        );
    }

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

  if (loggedIn) {
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
  } else {
    return (
      <div>
          <p>You are not logged in. <Link href="/login">Click here to log in</Link>.</p>
      </div>
  );
  }
    
}

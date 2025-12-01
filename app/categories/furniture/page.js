"use client"
import {Alfa_Slab_One} from 'next/font/google'; 
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth, } from '@supabase/auth-ui-react';
import MainLayout from '../../layouts/MainLayout.js'
import Product from '../../components/Product.js';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      // Initialize Supabase client
      const supabase = createClientComponentClient();
      const {data: {user}} = await supabase.auth.getUser()

      // Fetch products from the database
      const { data, error } = await supabase
        .from('productlisting')
        .select('*')
        .eq('category', 'Furniture');
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
              <div className="text-2xl font-bold mt-4 mb-6 px-4">Products / Furniture</div>
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

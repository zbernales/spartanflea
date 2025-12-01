"use client";
import MainLayout from "../layouts/MainLayout";
import SimilarProducts from "../components/SimilarProducts";
import ListItem from "../components/ListItem";

import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react';
import Product from '../components/Product.js';

export default function Wishlist(){

    /*const product = {    
        id: 1,
        title: "Lenovo Chromebook", 
        description: "Never used 11.6 inch",
        url: "https://picsum.photos/id/20",
        price: 8500
    }*/
    const [products, setProducts] = useState([]);
    useEffect(() => {
    async function fetchProducts() {
      // Initialize Supabase client
      const supabase = createClientComponentClient();
      const {data: {user}} = await supabase.auth.getUser()

      // Fetch products from the database
      const { data: wishlistData, error: wishlistError } = await supabase
    .from('wishlist')
    .select('*')
    .eq('userid', user.id);
if (wishlistError) {
    console.error('Error fetching wishlist:', wishlistError.message);
} else {
    if (wishlistData && wishlistData.length > 0) {
        const productIds = wishlistData.map(item => item.productid);
        const { data: productData, error: productError } = await supabase
            .from('productlisting')
            .select('*')
            .in('listingid', productIds);
        if (productError) {
            console.error('Error fetching products:', productError.message);
        } else {
            setProducts(productData);
        }
    } else {
        console.log('No items in wishlist');
    }
}}

    fetchProducts();
  }, []);
        

    return(
        <MainLayout>
            <div className="max-w-[1200px] mx-auto">
              <div className="text-2xl font-bold mt-4 mb-6 px-4">Wishlist</div>
              <div className="grid grid-cols-5 gap-4">
                {products.map(product => (
                  <Product key={product.listingid} product={product} />
                ))}

            </div>
          </div>
        </MainLayout>

    );
}
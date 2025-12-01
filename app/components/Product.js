'use client';

import Link from "next/link";

export default function Product({ product }) {
    
  return ( 
    <>
      {/*Link to unique product page */}
      <Link 
        href={`/product/${product?.listingid}`} 
        className='max-w-[200px] p-1.5 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-100 rounded mx-auto'
      >
        {/*Display product image if it exists */}
        { product?.image_link ? <img className="rounded cursor-pointer" src={'https://vmqznpcwtsjjsdtlrntb.supabase.co/storage/v1/object/public/' + product.image_link} style={{width:'200px',height:'200px'}} /> : null }

        {/*Adding the product title and price */}
        <div className="pt-2 px-1">
          <div className="font-semibold text-[15px] hover:underline cursor-pointer">{product?.title}</div>
          <div className="font-extrabold">${(product?.price).toFixed(2)}</div>

          {/* Displaying the category */}
          <div className="pt-2 px-1 flex items-center">
            <div className="font-semibold text-sm hover:underline cursor-pointer">Category:&nbsp;{product?.category}</div>
          </div>
        </div>
      </Link>
    </>
  );
};
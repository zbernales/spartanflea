'use client';
import ProductComp from "./Product";
import BiLoader from "react-icons/bi";

export default function SimilarProducts() {

  const products = [
    {
      id: 1,
      title: "The Grad Fall 2024 Lease",
      description: "Looking for someone to take over my lease at the Grad. It is $1200(with utilities and wifi), comes with a queen size bed and sturdy table. ",
        url: "https://picsum.photos/id/7", 
        price: 120000,
        category: "Housing"

      },
      {
        id: 2,
        title: "Lenovo Chromebook", 
        description: "Never used 11.6 inch",
        url: "https://picsum.photos/id/20",
        price: 8500,
        category: "Electronics"
      }
    ]
    
  return ( 
    <div className="">
      <div className ="border-b py-1 max-w-[1200px] mx-auto"/>

      <div className ="max-w-[1200px] mx-auto">
        <div className="font-bold text-2xl py-2 mt-4 ml-4">Similar items</div>

        {products.length >= 0 ? 
          <div className="grid grid-cols-5 gap-4">
            {products.map(product => (
              <ProductComp key={product.id} product={product} />
            ))}
          </div>
          : <div className="flex items-center justify-center">
              <div className="flex items0center justify-center gap-4 font-semibold">
                <BiLoader size={30} className="text-blue-400 animate-spin" />
                Loading Items...
              </div>
          </div>
        }
      </div>
    </div>
  );
};
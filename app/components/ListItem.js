'use client';

export default function ListItem({ product, onRemove }) {
    
  return ( 
    <div className="ml-4 relative flex justify-start my-2 border w-full p-6">
      <img src={product?.image_link +'/150'} className="rounded-md w-[150px] h-[150px]"/>

      <div className="overflow-hidden pl-2 w-full">
        <div className="flex items-center justify-between w-full">
          {/*Title */}
          <div className="flex items-center font-semibold justify-between w-[400px] text-[16px] underline">
            {product?.title}
          </div>
          {/*Price */}
          <div className="font-bold text-lg">
            ${(product?.price).toFixed(2)}
          </div>
        </div>

        {/*Description */}
        <div className="text-sm mt-2">
          {product?.description.substring(0,150)}...
        </div>

        {/*Message Button */}
        <div className="text-sm absolute bottom-6 right-24">
          <button className="p-2 bg-blue-500 rounded-full text-white">
            Message
          </button>
        </div>

        {/*Remove Button */}
        <div className="absolute right-4 bottom-6 text-sm">
          <button onClick={onRemove} className="p-2 bg-red-500 rounded-full text-white">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
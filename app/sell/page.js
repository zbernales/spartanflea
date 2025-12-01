"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import MainLayout from "../layouts/ProfileLayout";

export default function Sell(){
    const supabase = createClientComponentClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handlePublish = async () => {
        if (!title || !description || price === 0 || !image || !category) {
            alert('Please fill in all fields');
            return;
        }
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        if (!priceRegex.test(price.toString())) {
            alert('Price must be in the correct format. Please enter either an integer or two digits after the decimal point.');
            return;
        }
        if (title.length > 70) {
            alert('Title can not exceed 70 characters.');
            return;
        }
        if (description.length > 1000) {
            alert('Description can not exceed 1000 characters');
            return;
        }
        const {data: {user}} = await supabase.auth.getUser();
        // Upload image to Supabase storage
        const { data, error } = await supabase.storage.from('listing-images').upload('listing-images/' + image.name, image);

        if (error) {
            console.error('Error uploading image:', error.message);
            return;
        }

        const imageUrl = data.path;
        console.log(data);
        // Insert listing into the database
        if (!error) {
            const { data: listingData, error: listingError } = await supabase
                .from('productlisting')
                .insert([
                    { title, description, price, image_link: imageUrl, user_id: user.id, category }
                ]);

            if (listingError) {
                console.error('Error inserting listing:', listingError.message);
                return;
            }

            console.log('Listing inserted successfully:', listingData);
            alert('Successfully posted listing!');
            // Clear form fields after successful insertion
            setTitle('');
            setDescription('');
            setPrice(0);
            setImage(null);
            setCategory('');
        }
    };

    return(
        <MainLayout>
            <div className="pl-4 ">
                {/*Header */}
                <div className="">
                    <h2 className="mt-6 text-2xl font-extrabold text-gray-900">List New Item</h2>
                </div>
                {/*Form */}
                <div className="mt-4 bg-gray-200 rounded-lg w-1/2 p-2 overflow-auto max-h-200">
                    {/*Item Title */}
                    <div className="p-2">
                        <h2 className="font-semibold">Item Title</h2>
                        <input type="text" id="item-title" name="item-title" 
                            className="text-xs p-1 mt-2 w-1/2 border border-2 border-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {/*Item Description */}
                    <div className=" p-2 mt-2">
                        <h2 className="font-semibold">Item Description</h2>
                        <textarea id="item-description" name="item-description" 
                            className=" text-xs p-1 mt-2 w-10/12 border border-2 border-black"
                            style={{height: '100px', resize: 'none'}}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {/*Item Price */}
                    <div className=" p-2 mt-2 ">
                        <h2 className="font-semibold">Item Price</h2>
                        <div>
                            <span className="m-1 text-2xl">$</span>
                            <input type="number" id="item-price" name="item-price" 
                                className=" text-sm p-1 mt-2 w-1/4 border border-2 border-black"
                                min="0" step="0.01"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    {/*Item Category */}
                    <div className=" p-2 mt-2 ">
                        <h2 className="font-semibold">Item Category</h2>
                        <select
                            id="item-category"
                            name="item-category"
                            className="text-xs p-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled selected>Select category</option>
                            <option value="Housing">Housing</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Collectables and Art">Collectables and Art</option>
                            <option value="Sports">Sports</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>
                    {/*Item Image */}
                    <div className=" p-2 mt-2 ">
                        <h2 className="font-semibold">Item Image</h2>
                        <input 
                            type="file" 
                            id="item-image" 
                            name="item-image" 
                            accept=".png, .jpg, .jpeg" 
                            className="text-xs p-2"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        
                    </div>
                </div>
                {/*Button */}
                <div className="mt-2 ">
                    <button type="submit" 
                    className="w-1/12 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                    onClick={handlePublish}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </MainLayout>

    );
}
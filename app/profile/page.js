"use client";
import MainLayout from "@/app/layouts/ProfileLayout";
import Link from "next/link"; 
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAuth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { setConfig } from "next/config";
import Product from '../components/Product.js';


export default function Profile() {
    const defaultImageUrl = "https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_alternate_20006654.png";
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState([]);
    const [products, setProducts] = useState([]);
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('blob:http:/localhost:3000/san_jose_state_spartans_logo_alternate_20006654.png');
    useEffect(() => {
        async function fetchUser() {
            // Initialize Supabase client
            const supabase = createClientComponentClient();
            const {data: {user}} = await supabase.auth.getUser();
            setUserId(user.id);
            // Fetch product details from Supabase
            const { data: userData, userError } = await supabase
                .from('profile')
                .select('*')
                .eq('id', user.id)
                .single();

            if (userError) {
                console.error('Error fetching user:', error.message);
            } else {
                setUserData(userData);
                console.log(userData.profilepic);
                setImage(userData.profilepic);
                console.log(image);
                const { data: productData, error: productError } = await supabase
                    .from('productlisting')
                    .select('*')
                    .eq("user_id", user.id)
                if (productError) {
                    console.error("Error fetching products", error.message)
                } else {
                    setProducts(productData);
                }
            }
        }

        fetchUser();
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log(imageUrl);
            setImage(imageUrl);
            const  supabase = createClientComponentClient();
            const { data, error } = await supabase.storage.from('listing-images').upload('profile-images/' + imageUrl, file, { contentType: file.type});
            if (error) {
                console.error('Error uploading image:', error.message);
                return;
            }
            if (!error) {
                const { error: updateError } = await supabase
                    .from('profile')
                    .update([
                        { profilepic: imageUrl }
                    ])
                    .eq('id', userId);
    
                if (updateError) {
                    console.error('Error updating profile picture URL:', updateError.message);
                    return;
                } else {
                    console.log('Profile picture URL updated successfully!');
                    window.location.reload()
                }
            }
        }
    };

    const handleChange = (event) => {
        setBio(event.target.value);
    };

    const handleBioUpdate = async () => {
        try {
            const supabase = createClientComponentClient();
            const { data: updatedProfile, error } = await supabase
                .from('profile')
                .update({ bio })
                .eq('id', userId);

            if (error) {
                console.error('Error updating bio:', error.message);
            } else {
                console.log('Bio updated successfully');
                setUserData(updatedProfile);
            }
        } catch (error) {
            console.error('Error updating bio:', error.message);
        }
    };
    

    return (
        <MainLayout>
            <div className="max-w-[900px] mx-auto flex space-x-16">
                {/* Left Column */}
                <div className="w-1/3">
                    <div className="px-4 mb-4 mt-10">
                        <div className="text-center font-bold text-xl">{userData.username}'s profile</div>
                        <div className="text-center text-sm">{userData.email}</div>
                    </div>
                    <img
                        className="w-56 h-56 rounded-full ml-4" 
                        src={image ? 
                            'https://vmqznpcwtsjjsdtlrntb.supabase.co/storage/v1/object/public/listing-images/profile-images/' + image :
                            'https://vmqznpcwtsjjsdtlrntb.supabase.co/storage/v1/object/public/listing-images/profile-images/blob:http:/localhost:3000/spartan.png'}
                        alt={userData?.profilepic ?
                            'Profile Picture' :
                            'Default Image'}
                    />
                    <div className="text-center mt-12 text-sm bg-blue-600 rounded-full pt-1 pb-1 text-white cursor-pointer relative">
                        Upload/Change Profile Picture
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            id="profile-picture-input"
                        />
                    </div>
                    <div className="mt-4 mb-12 mr-4 ml-8">
                        <div className="bg-gray-200 rounded-lg p-2 overflow-auto max-h-200">
                            <div className="pt-3">
                                <div className="font-bold pb-1">About Me:</div>
                                <div className="font-semibold text-sm text-left">{userData?.bio}</div>
                                {/* Form to edit bio */}
                                    <form onSubmit={handleBioUpdate}>
                                        <label htmlFor="bio">Edit Bio:</label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={bio}
                                            onChange={handleChange}
                                        />
                                        <button type="submit">Save</button>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Middle Column */}
                <div className="w-1/3 mt-10">
                    

                  

                    <div className="mt-4 mb-12 mr-4 ml-8">
                        <div className="bg-gray-200 rounded-lg p-2 overflow-auto max-h-200">
                            <div className="pt-3">
                                <div className="font-semibold pb-1">Items Listed:</div>
                                <div className="grid grid-rows gap-4">
                                    {products.map(product => (
                                    <Product key={product.listingid} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-1/3 mt-4">
                    <div className="pt-12 grid grid-rows-3 gap-14">
                        <Link href="/sell" className="mx-10 bg-blue-600 text-white py-2 px-10 rounded-full cursor-pointer inline-flex items-center justify-center">
                        <button>
                            Create New Listing
                        </button>
                        </Link>
                        <Link href="/wishlist" className="mx-10 bg-blue-600 text-white py-2 px-10 rounded-full cursor-pointer inline-flex items-center justify-center">
                        <button>
                            View Wishlist
                        </button>
                        </Link>
                        <Link href="/messages" className="mx-10 bg-blue-600 text-white py-2 px-10 rounded-full cursor-pointer inline-flex items-center justify-center">
                        <button>
                            View Inbox
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

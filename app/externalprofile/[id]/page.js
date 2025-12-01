"use client";
import MainLayout from "@/app/layouts/ProfileLayout";
import Link from "next/link"; 
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAuth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Product from '../../components/Product.js';


export default function externalProfile({params}) {
    const defaultImageUrl = "https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_alternate_20006654.png";
    const [profile, setProfile] = useState([]);
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        async function fetchProfile() {
            console.log(params.id);
            // Initialize Supabase client
            const supabase = createClientComponentClient();
            const {data: {user}} = await supabase.auth.getUser();
            // Fetch product details from Supabase
            const { data: profileData, error: profileError } = await supabase
                .from('profile')
                .select('*')
                .eq('id', params.id)
                .single();

            if (profileError) {
                console.error('Error fetching profile:', error.message);
            } else {
                setProfile(profileData);
                const { data: productData, error: productError } = await supabase
                    .from('productlisting')
                    .select('*')
                    .eq("user_id", params.id)
                if (productError) {
                    console.error("Error fetching products", error.message)
                } else {
                    setProducts(productData);
                }
            }
        }

        fetchProfile();
    }, [params.id]);

    const handleSendMessage = async () => {
        const supabase = createClientComponentClient();
        const { data: { user } } = await supabase.auth.getUser();
    
        try {
            // Check if there is an existing conversation in both directions
            const { data: existingConversation1, error: conversationError1 } = await supabase
                .from('conversation')
                .select('*')
                .eq('messenger_id', user.id)
                .eq('reciever_id', params.id);
    
            const { data: existingConversation2, error: conversationError2 } = await supabase
                .from('conversation')
                .select('*')
                .eq('messenger_id', params.id)
                .eq('reciever_id', user.id);
            
            const {data: allUserConversations, error: allUserConversationsError } = await supabase
                .from('conversation')
                .select('*')
                .or(`messenger_id.eq.${user.id},reciever_id.eq.${user.id}`);

            if (allUserConversationsError) {
                throw new Error(allUserConversationsError?.message);
            }
            if (conversationError1 || conversationError2) {
                throw new Error(conversationError1?.message || conversationError2?.message);
            }
    
            if (existingConversation1.length > 0) {
                // Direct the user to the existing conversation
                console.log(existingConversation1);
                console.log('Existing conversation:', existingConversation1);
                let index = 0;
                for (let i = 0; i < allUserConversations.length; i++) {
                    if (existingConversation1[0].id === allUserConversations[i].id) {
                        index = i;
                    }
                }
                window.location.href = '../messages?index=' + index;
            } else if (existingConversation2.length > 0) {
                console.log('Existing conversation:', existingConversation2);
                let index = 0;
                for (let i = 0; i < allUserConversations.length; i++) {
                    if (existingConversation2[0].id === allUserConversations[i].id) {
                        break;
                    } else {
                        index++;
                    }
                }
                window.location.href = '../messages?index=' + index;
            } else {
                // Create a new conversation between the current user and the seller
                const { data: messenger_username} = await supabase
                    .from('profile')
                    .select('username')
                    .eq('id', user.id)
                console.log(messenger_username);
                const { data: reciever_username} = await supabase 
                    .from('profile')
                    .select('username')
                    .eq('id', params.id)
    

                const { data: newConversation, error: newConversationError } = await supabase
                    .from('conversation')
                    .insert([
                        {
                            messenger_id: user.id,
                            reciever_id: params.id,
                            musername: messenger_username[0].username,
                            rusername: reciever_username[0].username
                        },
                    ]);
    
                if (newConversationError) {
                    throw new Error(newConversationError.message);
                }
    
                console.log('New conversation created:', newConversation);
                window.location.href = '../messages?index=' + allUserConversations.length;
            }
        } catch (error) {
            console.error('Error handling message:', error.message);
            // Handle error
        }
    };


    return (
        <MainLayout>
            <div className="max-w-[900px] mx-auto flex space-x-16">
                {/* Left Column */}
                <div className="w-1/3">
                    <div className="px-4 mb-4 mt-10">
                        <div className="text-center font-bold text-xl">{profile?.username}'s profile</div>
                        <div className="text-center text-sm">{profile?.email}</div>
                    </div>
                    <img
                        className="w-56 h-56 rounded-full ml-4" 
                        src={'https://ckjvjcjjzomgzucvmjpc.supabase.co/storage/v1/object/public/listing-images/profile-images/' + profile?.profilepic}
                        alt={profile?.title}
                    />
                    <div className="mt-4 mb-12 mr-4 ml-8">
                        <div className="bg-gray-200 rounded-lg p-2 overflow-auto max-h-200">
                            <div className="pt-3">
                                <div className="font-semibold pb-1">Bio:</div>
                                <div className="font-bold text-sm text-left">{profile?.bio}</div>
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
                        <button className="mx-4 bg-blue-500 text-white py-2 px-10 rounded-full cursor-pointer" onClick={handleSendMessage}>
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

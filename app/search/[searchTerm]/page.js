"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '../../layouts/MainLayout';
import Product from '../../components/Product';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SearchResults() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        //const searchTerm  = router.query;
        const urlParts = window.location.pathname.split('/');
        const undecodedSearchTerm = urlParts[urlParts.length - 1] || '';
        const searchTerm = decodeURIComponent(undecodedSearchTerm.replace(/\+/g, ' '));
        setSearchTerm(searchTerm);
        if (searchTerm) {
            fetchSearchResults(searchTerm);
        }
    }, [router.query]);

    const fetchSearchResults = async (searchTerm) => {
        try {
            // Fetch products from Supabase based on the search term
            const { data, error } = await supabase
                .from('productlisting')
                .select('*')
                .ilike('title', `%${searchTerm}%`); // Case-insensitive search

            if (error) {
                console.error('Error fetching search results:', error.message);
            } else {
                setSearchResults(data);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    if (searchResults.length == 0) {
        return (
            <MainLayout>
            <div className="max-w-[1200px] mx-auto">
                <div className="text-2xl font-bold mt-4 mb-6 px-4">No Results for "{searchTerm}"</div>
            </div>
        </MainLayout>
        )
    } else {
        return (
            <MainLayout>
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-2xl font-bold mt-4 mb-6 px-4">Search Results for "{searchTerm}"</div>
                    <div className="grid grid-cols-5 gap-4">
                        {/* Render search results */}
                        {searchResults.map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </MainLayout>
        );
    }
}
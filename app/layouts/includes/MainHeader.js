"use client";
import Link from "next/link"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MainHeader() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            router.push(`/search/${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div id="MainHeader" className="border-b">
            <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                <div className="flex items-center w-full">
                    <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-1 mx-auto">
                        <Link className="" href="/">
                            <img className="" width="400" src="https://docs.google.com/drawings/d/e/2PACX-1vSoyGWRLYwYovMlLkiEwC9D3iWQDKVmiXFt_80xsv0721UmTsETuE1j2tsbpcqxrTsZ5EN9CDQzCuZo/pub?w=4320&h=864" alt="spartan flea logo" />
                        </Link>

                        <div className="w-full relative">
                            <div className="flex items-center">
                                {/* Search Bar */}
                                <div className="rounded-full relative flex items-center border-2 border-gray-900 w-full p-2 mt-1 ">
                                    <input
                                        className="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search"
                                        type="text"
                                    />
                                </div>
                                <button className="rounded-full mt-1 flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
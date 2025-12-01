"use client";
import Link from "next/link"; 


export default function Footer(){
    return(
        <div id="Footer" className="bg-blue-600 border-t mt-20 px-8">
        <div className="flex items-baseline justify-between w-full mx-auto max-w-[1200px] py-10">
            <ul className="text-white">
                <li className="font-bold text-lg">Buy</li>
                <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/register">Registration</Link>
                </li>
                <li className="py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/help">Buying Help</Link>
                </li>
            </ul>

            <ul className="text-white">
                <li className="font-bold text-lg">Sell</li>
                <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/sell">Start Selling</Link>
                </li>
                <li className="py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/sell">Learn to Sell</Link>
                </li>
                <li className="py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/affiliates">Affiliates</Link>
                </li>
            </ul>

            <ul className="text-white">
                <li className="font-bold text-lg">About SpartanFlea</li>
                <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/about">Learn More About Us</Link>
                </li>
                <li className="py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/news">News</Link>
                </li>
                <li className="py-1 text-xs hover:underline cursor-pointer">
                    <Link href="/policies">Policies</Link>
                </li>
            </ul>
            
        </div>
    </div>
    );
}
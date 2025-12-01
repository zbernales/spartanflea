"use client";
import MainLayout from "@/app/layouts/ProfileLayout";
import Link from "next/link"; 
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAuth } from '@supabase/auth-ui-react';

export default function News() {

    return (
        <MainLayout>
            <div className="max-w-[1000px] mx-auto flex space-x-16">

                {/* Right Column */}
                <div className="w-1/2 mt-4 flex justify-center items-center">
                    <img
                        className="w-full max-w-[80%] h-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS779ML7LCGVUVbeVc9QcwTOOOEA6i_04jTMhETtrZXYg&s"
                        style={{ paddingTop: '20px' }}
                    />
                </div>

                {/* Left Column */}
                <div className="w-1/2">
                    <p className="mt-20 mb-4 text-3xl font-bold text-gray-800">
                        No news currenty, we will keep you updated!
                    </p>
                </div>


            </div>
        </MainLayout>
    );
}

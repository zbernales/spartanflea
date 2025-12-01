"use client";
import MainLayout from "@/app/layouts/ProfileLayout";
import Link from "next/link"; 
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAuth } from '@supabase/auth-ui-react';

export default function Affiliates() {
    return (
        <MainLayout>
            <div className="max-w-[1100px] mx-auto flex space-x-16">

                {/* Left Column */}
                <div className="w-1/3 mt-10 ml-10 flex flex-col items-center">
                    <div className="flex flex-col items-center h-full border border-gray-400 rounded p-4">
                        <img
                            className="w-60 h-auto"
                            src="https://mlml.sjsu.edu/wp-content/uploads/2020/06/SJSU-logo.png"
                            style={{ paddingTop: '20px' }}
                        />
                        <div className="text-center">
                            <p className="mt-4 mb-4 text-xl font-bold text-gray-800">
                                San Jose State - Most Transformative University
                            </p>
                        </div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="w-1/3 mt-10 flex flex-col items-center">
                    <div className="flex flex-col items-center h-full border border-gray-400 rounded p-4">
                        <img
                            className="w-60 h-auto"
                            src="https://www.sjsu.edu/cs/pics/student-club-sce-society.png"
                            style={{ paddingTop: '20px' }}
                        />
                        <div className="text-center">
                            <p className="mt-8 mb-4 text-xl font-bold text-gray-800">
                                SJSU Software and Computer Engineering - The Future of Developers
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-1/3 mt-10 flex flex-col items-center">
                    <div className="flex flex-col items-center h-full border border-gray-400 rounded p-4">
                        <img
                            className="w-60 h-auto"
                            src="https://www.sjsu.edu/cs/pics/acm-at-sjsu-student-club-logo.png"
                            style={{ paddingTop: '20px' }}
                        />
                        <div className="text-center">
                            <p className="mt-4 mb-4 text-xl font-bold text-gray-800">
                                SJSU Computer Science - Powering Silicon Valley
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

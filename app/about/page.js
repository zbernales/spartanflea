"use client";
import MainLayout from "@/app/layouts/ProfileLayout";
import Link from "next/link"; 
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAuth } from '@supabase/auth-ui-react';

export default function About() {

    return (
        <MainLayout>
            <div className="max-w-[1100px] mx-auto flex space-x-16">
                {/* Left Column */}
                <div className="w-1/2">
                    <p className="mt-14 mb-4 text-xl text-gray-700">
                        Spartan Flea is a student marketplace application created by fellow SJSU students FOR SJSU students. We know how difficult and frustrating marketplace shopping can be in the San Jose area, so Flea is here to save the day. Our Software Engineers have created this new marketplace application that is more trustworthy for SJSU students, allowing all of us to find those golden treasures we've been looking for! Reliability and safety are our top concerns, that's why an @sjsu.edu email is required to be apart of us, along with frequent admin approvals. Happy shopping!
                    </p>
                </div>

                {/* Right Column */}
                <div className="w-1/2 mt-4">
                    <img
                        className="w-auto h-auto ml-auto mr-4 rounded-xl"
                        src="https://www.sjsu.edu/sjsulovessj/pics/20200718-107_Spartan_Bridge_SJDA_WoW_Mel_Chircop-0191.jpg"
                        style={{ marginTop: '20px' }}
                    />
                </div>
            </div>
        </MainLayout>
    );
}

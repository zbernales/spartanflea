"use client";
import MainLayout from "@/app/layouts/ProfileLayout";
import Link from "next/link"; 
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useAuth } from '@supabase/auth-ui-react';

export default function Policies() {

    return (
        <MainLayout>
            <div className="max-w-[1100px] mx-auto flex space-x-16">
            
            <div className="w-1/2">
                
                <h2 className="text-xl font-bold text-gray-800 mb-2 mt-10">Prohibited Items:</h2>
                <ul className="list-decimal pl-8">
                    <li>Weapons, ammunition, explosives, or fireworks.</li>
                    <li>Drugs, including prescription drugs, recreational drugs, and drug paraphernalia.</li>
                    <li>Counterfeit or replica items.</li>
                    <li>Stolen goods or items obtained through illegal means.</li>
                    <li>Hazardous materials or substances.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-2 mt-6">Listing Guidelines:</h2>
                <ul className="list-decimal pl-8">
                    <li>Accurate and detailed descriptions of items for sale.</li>
                    <li>Clear and high-quality images of items.</li>
                    <li>Listing items in the appropriate categories.</li>
                    <li>Compliance with local laws and regulations regarding the sale of certain items.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-2 mt-6">Communication and Negotiation:</h2>
                <ul className="list-decimal pl-8">
                    <li>Respectful and appropriate communication with other users.</li>
                    <li>Transparent and honest negotiation of prices and terms.</li>
                    <li>Use of the messaging system within Flea Marketplace for communication.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-2 mt-6">Transaction Policies:</h2>
                <ul className="list-decimal pl-8">
                    <li>In-person transactions in safe and public locations.</li>
                    <li>Use of secure payment methods, such as Zelle or cash on delivery.</li>
                    <li>Verification of the condition of items before completing transactions.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-2 mt-6">User Conduct and Community Guidelines:</h2>
                <ul className="list-decimal pl-8">
                    <li>Respectful and courteous behavior towards other users.</li>
                    <li>Prohibition of harassment, bullying, hate speech, or discrimination.</li>
                    <li>Reporting mechanism for inappropriate behavior or listings.</li>
                    <li>Compliance with Flea's Community Standards and Terms of Service.</li>
                </ul>
            </div>

                {/* Right Column */}
                <div className="w-1/2 mt-12 flex flex-col items-center">
                    <img
                        className="w-auto h-auto ml-auto mr-auto mt-4 rounded-xl"
                        src="https://losangelesdefenders.com/wp-content/uploads/2020/02/professional-male-lawyer-judge-working-with-contract-papers-documents-gavel-scales-justice-table-courtroom-law-legal-services-concept_28283-1373.jpg"
                        style={ { marginBottom: '100px'}}
                    />

                    <img
                        className="w-auto h-auto ml-auto mr-auto rounded-xl"
                        src="https://www.collaboris.com/wp-content/uploads/2022/10/policy-procedure-process-scaled.jpg"
                        style={{ maxWidth: '90%' }}
                    />

                </div>
            </div>
        </MainLayout>
    );
}

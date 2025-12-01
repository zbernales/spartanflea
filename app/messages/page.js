"use client";
import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

export default function Message() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const [replyContent, setReplyContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [userid, setUserid] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const indexFromUrl = parseInt(urlParams.get('index'));
        if (!isNaN(indexFromUrl)) {
            setSelectedConversationIndex(indexFromUrl);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchConversations();
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchMessages() {
            if (conversations.length === 0) return;
            const conversationId = conversations[selectedConversationIndex].id;
            const supabase = createClientComponentClient();
            const { data, error } = await supabase
                .from('message')
                .select('*')
                .eq('conversation_id', conversationId);
            if (error) {
                console.error('Error fetching messages:', error.message);
            } else {
                setMessages(data);
            }
        }

        fetchMessages();
    }, [selectedConversationIndex, conversations]);

    const fetchConversations = async () => {
        try {
            const supabase = createClientComponentClient();
            const {data: {user}} = await supabase.auth.getUser();
            setUserid(user.id);
            if (!user) {
                // User is not authenticated, handle accordingly
                return;
            }

            const { data, error } = await supabase
                .from('conversation')
                .select('*')
                .or(`messenger_id.eq.${user.id},reciever_id.eq.${user.id}`);

            if (error) {
                throw error;
            }

            setConversations(data || []);
            const { userData, userError } = await supabase
                .from('profile')
                .select('*')
                .eq(`id`, );

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error fetching conversations:', error.message);
            // Handle error
        }
    };

    const handleConversationClick = (index) => {
        setSelectedConversationIndex(index);
        setReplyContent('');
    };

    const updateConversation = (index, newMessage) => {
        const updatedConversations = [...conversations];
        updatedConversations[index].messages.push(newMessage);
        setConversations(updatedConversations);
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (replyContent.trim() === '') return;
        if (replyContent.length > 500) {
            alert("Messages must not exceed 500 characters.");
            return; // Content exceeds 250 characters
        }
        const conversationId = conversations[selectedConversationIndex].id;
        const supabase = createClientComponentClient();
        const {data: {user}} = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('message')
            .insert([{ conversation_id: conversationId, content: replyContent, user_id: user.id }])
            .select('*');
        if (error) {
            console.error('Error sending message:', error.message);
        } else {
            setReplyContent('');
            setMessages([...messages, data[0]]);
        }
    };

    const selectedConversation = conversations[selectedConversationIndex];

    return (
        <MainLayout>
            <div className="container mx-auto p-4 flex">
                <div className="w-1/3 pr-4 border-r">
                    <h1 className="text-2xl font-semibold mb-6">Conversations</h1>
                    <div className="divide-y divide-gray-300">
                        {conversations.map((conversation, index) => (
                            <div key={index} className={`p-4 cursor-pointer ${selectedConversationIndex === index ? 'bg-gray-500 text-white' : ''}`} onClick={() => handleConversationClick(index)}>
                                 <h2 className="text-lg font-semibold">{conversation.reciever_id !== userid ? conversation.rusername : conversation.musername}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/3 pl-4">
                    <div>
                        {messages?.map(({ id, user_id, content }) => (
                            <div key={id} className={`flex flex-col items-${user_id === userid ? 'end' : 'start'} mb-4`}>
                                <div className={`rounded-lg p-3 ${user_id === userid ? 'bg-gray-200 self-end' : 'bg-blue-500 text-white self-start'}`}>
                                    {content}
                                </div>
                            </div>
                        ))}
                        <form onSubmit={(e) => handleReplySubmit(e)} className="mt-4">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Type your message here..."
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            />
                            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

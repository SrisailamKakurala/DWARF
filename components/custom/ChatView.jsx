"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { useConvex } from "convex/react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ChatView = () => {
    const { id } = useParams();
    const convex = useConvex();
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const { messages, setMessages } = useContext(MessagesContext);

    const [userPrompt, setUserPrompt] = useState('');
    

    useEffect(() => {
        if (id) GetWorkspaceData();
        
        if (!userDetails) {
            if (typeof window !== "undefined" && window.localStorage) {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUserDetails(JSON.parse(storedUser));
                }
            }
        }

        console.log(userDetails)
    }, [id]);

    const GetWorkspaceData = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id,
        });

        // ✅ Ensure messages is always an array
        setMessages(result?.messages || []);
        console.log(result);
    };

    return (
        <div className="h-full flex flex-col justify-between pb-3 px-2 py-2 border border-white border-opacity-5 rounded-lg">
            <div className="overflow-y-scroll scroll-hide h-full">
                {Array.isArray(messages) && messages.map((msg, index) => (
                    <div className="p-3 rounded-lg mb-2 flex gap-2 items-start" style={{ backgroundColor: Colors.CHAT_BACKGROUND }} key={index}>
                        {msg?.role === 'user' && (
                            <Image src={userDetails?.picture || "/default-avatar.png"} alt="user Image" className="rounded-full" width={35} height={35} />
                        )}
                        <h2 className="text-purple-500">{msg.content}</h2>
                    </div>
                ))}
            </div>


            <div className="flex rounded-md mt-8 h-16 w-full">
                <input onChange={(e) => setUserPrompt(e.target.value)} type="text" className="h-full w-[90%] px-4 outline-none rounded-l-md" placeholder={Lookup.INPUT_PLACEHOLDER} name="prompt" />
                <ArrowUp onClick={() => onGenerate(userPrompt)} size={20} className="cursor-pointer w-[10%] font-semibold bg-purple-700  text-white rounded-r-md h-full p-2" />
            </div>
        </div>
    );
};

export default ChatView;

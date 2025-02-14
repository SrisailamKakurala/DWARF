import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Lookup from "@/data/Lookup";
import { ArrowRight } from "lucide-react";
import React, { useContext, useState } from "react";
import SigninDialog from "./SigninDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { DialogContext } from "@/context/DialogContext";

const Hero = () => {

    const CreateWorkSpace = useMutation(api.workspace.CreateWorkSpace);

    const router = useRouter();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const { openDialog, setOpenDialog } = useContext(DialogContext);

    const [userPrompt, setUserPrompt] = useState('');

    const onGenerate = async (input) => {
        console.log(userDetails);
        if (!userDetails?.name) {
            setOpenDialog(true);
            console.log('true')
            return;
        }
        console.log('authenticated');
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);

        const workspaceId = await CreateWorkSpace({
            messages: [msg],
            user: await userDetails._id,
        });

        console.log(workspaceId);
        router.push('/workspace/' + workspaceId)
    }
    return (
        <div className="h-[90%] w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center h-[90%]">
                <h1 className="font-bold text-6xl">{Lookup.HERO_HEADING}</h1>
                <p className="text-lg mt-4 text-gray-400">{Lookup.HERO_DESC}</p>

                <div className="flex rounded-md mt-8 h-16 w-[30vw]">
                    <input onChange={(e) => setUserPrompt(e.target.value)} type="text" className="h-full w-[90%] px-4 outline-none rounded-l-md" placeholder={Lookup.INPUT_PLACEHOLDER} name="prompt" />
                    <ArrowRight onClick={() => onGenerate(userPrompt)} size={40} className="cursor-pointer w-[10%] font-bold bg-purple-700  text-white rounded-r-md h-full p-4" />
                </div>
            </div>
            <SigninDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(false)} />
        </div>
    );
}

export default Hero;
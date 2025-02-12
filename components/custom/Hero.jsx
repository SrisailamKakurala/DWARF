import Lookup from "@/data/Lookup";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

const Hero = () => {
    const [userPrompt, setUserPrompt] = useState('');
    return (
        <div className="flex flex-col items-center justify-center h-[90%]">
            <h1 className="font-bold text-6xl">{Lookup.HERO_HEADING}</h1>
            <p className="text-lg mt-4 text-gray-400">{Lookup.HERO_DESC}</p>

            <div className="flex rounded-md mt-8 h-16 w-[30vw]">
                <input onChange={(e) => setUserPrompt(e.target.value)} type="text" className="h-full w-[90%] px-4 outline-none rounded-l-md" placeholder={Lookup.INPUT_PLACEHOLDER} name="prompt"/>
                <ArrowRight size={40} className="cursor-pointer w-[10%] font-bold bg-purple-700  text-white rounded-r-md h-full p-4" />
            </div>
        </div>
    );
}

export default Hero;
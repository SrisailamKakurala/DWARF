import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../components/Chat";
import CodeEditor from "../components/CodeEditor";
import FileExplorer from "../components/FileExplorer";
import GenerateButton from "../components/GenerateButton";
import Preview from "../components/Preview";



const Editor = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const prompt = query.get("prompt");

    return (
        <div className="flex h-screen">
            <div className="w-1/5 bg-gray-800 p-4">
                <Chat />
            </div>
            <div className="w-3/5 p-4">
                <CodeEditor />
                <GenerateButton prompt={prompt} />
            </div>
            <div className="w-1/5 bg-gray-800 p-4">
                <FileExplorer />
            </div>
        </div>
    );
};

export default Editor;

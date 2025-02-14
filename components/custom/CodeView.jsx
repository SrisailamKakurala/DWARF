"use client"
import { MessagesContext } from '@/context/MessagesContext';
import Lookup from '@/data/Lookup';
import {
    SandpackProvider,
    SandpackThemeProvider,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackStack,
    SandpackLayout,
} from '@codesandbox/sandpack-react';
import axios from 'axios';
import Prompt from "@/data/Prompt";
import { useContext, useEffect, useState } from 'react';
import { SandpackFileExplorer } from 'sandpack-file-explorer';

const CodeView = () => {
    const [activeTab, setActiveTab] = useState('code');
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
    const { messages, setMessages } = useContext(MessagesContext);

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages.length - 1]?.role;
            if (role === 'user') {
                GenerateAiCode();
            }
        }
    }, [messages, files])

    const GenerateAiCode = async () => {
        const PROMPT = messages[messages.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
        const result = await axios.post('/api/gen-code', {
            prompt: PROMPT
        })
        console.log(result.data);
        const aiResp = result.data;

        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files }
        console.log(mergedFiles);
        setFiles(mergedFiles);
    }

    return (
        <div className="h-full">
            <div className="flex gap-3 mb-2">
                <h1 onClick={() => setActiveTab('code')} className={`${activeTab == 'code' ? "bg-purple-500" : "bg-gray-800"} p-2 rounded-md text-white cursor-pointer `}>Code</h1>
                <h1 onClick={() => setActiveTab('preview')} className={`${activeTab == 'preview' ? "bg-purple-500" : "bg-gray-800"} p-2 rounded-md text-white cursor-pointer `}>Preview</h1>
            </div>
            <SandpackProvider
                key={JSON.stringify(files)}
                template="react-ts"
                customSetup={{
                    files: files,
                    dependencies: {
                        ...Lookup.DEPENDANCY
                    }
                }}
                options={{
                    externalResources: ['https://cdn.tailwindcss.com']
                }}
            >
                <SandpackThemeProvider theme={'dark'} style={{ fontWeight: 600, fontSize: '14px' }}>
                    <SandpackStack>
                        <SandpackLayout style={{ height: '80vh' }}>
                            {activeTab == 'code' ? (
                                <>
                                    <SandpackFileExplorer files={files} />
                                    <SandpackCodeEditor
                                        wrapContent
                                        style={{
                                            minHeight: '100%',
                                            maxHeight: '100%',
                                            overflow: 'auto',
                                        }}
                                        showTabs
                                        closableTabs
                                        showInlineErrors
                                        showLineNumbers
                                    />
                                </>
                            ) : (
                                <>
                                    <SandpackPreview style={{ height: '80vh' }} showNavigator onLoad={() => console.log('loading preview...')} />
                                </>
                            )}

                        </SandpackLayout>
                    </SandpackStack>
                </SandpackThemeProvider>
            </SandpackProvider>
        </div>
    );
}

export default CodeView;
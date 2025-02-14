"use client";
import { MessagesContext } from "@/context/MessagesContext";
import Lookup from "@/data/Lookup";
import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackStack,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { useContext, useEffect, useState } from "react";
import { SandpackFileExplorer } from "sandpack-file-explorer";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(structuredClone(Lookup.DEFAULT_FILE));
  const { messages } = useContext(MessagesContext);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    const PROMPT =
      messages[messages.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-code", {
      prompt: PROMPT,
    });

    const aiResp = result.data;
    
    console.log("aiResp:", aiResp?.files);

    // Ensure AI-generated files take priority over default ones
    const mergedFiles = { ...structuredClone(Lookup.DEFAULT_FILE), ...aiResp?.files };
    console.log("mergedFiles:", mergedFiles);
    setFiles(mergedFiles);
  };

  useEffect(() => {
    console.log("Updated files in state:", files);
  }, [files]);

  return (
    <div className="h-full">
      <div className="flex gap-3 mb-2">
        <h1
          onClick={() => setActiveTab("code")}
          className={`${
            activeTab == "code" ? "bg-purple-500" : "bg-gray-800"
          } p-2 rounded-md text-white cursor-pointer `}
        >
          Code
        </h1>
        <h1
          onClick={() => setActiveTab("preview")}
          className={`${
            activeTab == "preview" ? "bg-purple-500" : "bg-gray-800"
          } p-2 rounded-md text-white cursor-pointer `}
        >
          Preview
        </h1>
      </div>

      {/* Ensure `files` is defined before rendering Sandpack */}
      {files && (
        <SandpackProvider
          key={JSON.stringify(files)}
          template="react-ts"
          customSetup={{
            files: files,
            dependencies: {
              ...Lookup.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackThemeProvider
            theme={"dark"}
            style={{ fontWeight: 600, fontSize: "14px" }}
          >
            <SandpackStack>
              <SandpackLayout style={{ height: "80vh" }}>
                {activeTab == "code" ? (
                  <>
                    <SandpackFileExplorer files={files} />
                    <SandpackCodeEditor
                      wrapContent
                      style={{
                        minHeight: "100%",
                        maxHeight: "100%",
                        overflow: "auto",
                      }}
                      showTabs
                      closableTabs
                      showInlineErrors
                      showLineNumbers
                    />
                  </>
                ) : (
                  <SandpackPreview
                    style={{ height: "80vh" }}
                    showNavigator
                    onLoad={() => console.log("loading preview...")}
                  />
                )}
              </SandpackLayout>
            </SandpackStack>
          </SandpackThemeProvider>
        </SandpackProvider>
      )}
    </div>
  );
};

export default CodeView;

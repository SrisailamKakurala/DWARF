import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

if (typeof window !== "undefined") {
  self.MonacoEnvironment = {
    getWorker: function (workerId, label) {
      let url = "";
      if (label === "json") {
        url = "/monaco-editor/min/vs/language/json/json.worker.js";
      } else if (label === "css" || label === "scss" || label === "less") {
        url = "/monaco-editor/min/vs/language/css/css.worker.js";
      } else if (label === "html" || label === "handlebars" || label === "razor") {
        url = "/monaco-editor/min/vs/language/html/html.worker.js";
      } else if (label === "typescript" || label === "javascript") {
        url = "/monaco-editor/min/vs/language/typescript/ts.worker.js";
      } else {
        url = "/monaco-editor/min/vs/editor/editor.worker.js";
      }
      
      return new Worker(url, { type: "module" });
    },
  };
}


const CodeEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.create(editorRef.current, {
        value: "// Start coding...",
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
      });
    }
  }, []);

  return (
    <div
      ref={editorRef}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: '20%',
        right: 0,
        width: "80%",
        height: "100%",
      }}
    />
  );
};

export default CodeEditor;

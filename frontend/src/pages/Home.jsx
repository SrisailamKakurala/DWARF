import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const navigate = useNavigate();

    const handleGenerate = async () => {
        console.log(prompt);
        console.log('prompt');
          try {
              const response = await axios.post("http://localhost:5000/generate", { prompt });
              setOutput(response.data.code);
          } catch (error) {
              console.error("Error generating code:", error);
          }
      };

    const handleSubmit = async () => {
        if (prompt.trim()) {
            await handleGenerate();
            console.log(output);
            navigate(`/editor?prompt=${encodeURIComponent(prompt)}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold">Generate Your Website</h1>
            <input
                type="text"
                placeholder="Enter your prompt..."
                className="p-2 mt-4 w-1/2 bg-gray-800 border border-gray-600 rounded"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="mt-4 px-4 py-2 bg-blue-500 rounded" onClick={handleSubmit}>
                Generate
            </button>
        </div>
    );
};

export default Home;

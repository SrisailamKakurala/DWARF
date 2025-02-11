import axios from "axios";
import { useState } from "react";

const GenerateButton = ({ prompt }) => {
    const [output, setOutput] = useState("");

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

    return (
        <div>
            <button className="mt-4 px-4 py-2 bg-green-500 rounded" onClick={handleGenerate}>
                Generate Code
            </button>
            {output && <pre className="mt-4 p-4 bg-gray-800 text-white">{output}</pre>}
        </div>
    );
};

export default GenerateButton;

import { useState } from "react";

const Preview = ({ code }) => {
    const [iframeSrc, setIframeSrc] = useState("");

    const handlePreview = () => {
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setIframeSrc(url);
    };

    return (
        <div>
            <button onClick={handlePreview} className="px-4 py-2 bg-blue-500 rounded">
                Preview
            </button>
            {iframeSrc && <iframe src={iframeSrc} className="w-full h-96 mt-4"></iframe>}
        </div>
    );
};

export default Preview;

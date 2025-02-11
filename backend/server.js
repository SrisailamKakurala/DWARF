require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
    try {
      console.log('entered req');
      const { prompt } = req.body;
      console.log('prompt: '  + prompt);
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        // Get the Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate a response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ code: text });
    } catch (error) {
        console.error("Error generating code:", error);
        res.status(500).json({ error: "Failed to generate code" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Securely access the API key from environment variables
    const apiKey = process.env.Gemini_Api_Key;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing API key" });
    }

    try {
        const { prompt } = req.body;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);

        // Ensure CORS headers are set on API response
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return res.status(200).json({ response: result.response.text() });
    } catch (error) {
        console.error("Error generating AI response:", error);
        return res.status(500).json({ error: "Failed to generate AI response" });
    }
}

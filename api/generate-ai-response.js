/*import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDbWt7XfEMy3prfuqpYCjCaGgBWAzo-bw0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Define AI in 3 simple sentences";

const result = await model.generateContent(prompt);
console.log(result.response.text());


import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://drod-1hva7d17f-davedigitals-projects.vercel.app/'
}));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/generate-ai-response', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
      const result = await model.generateContent(prompt);
      res.status(200).json({ response: result.response.text() });
  } catch (error) {
      console.error("Error generating AI response:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
  }
}
*/
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Ensure the API key is stored securely in Vercel's environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing API key" });
    }

    const { prompt } = req.body;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        
        res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ Fix CORS
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.status(200).end(); // ✅ Handle CORS preflight request
        }

        res.status(200).json({ response: result.response.text() });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Failed to generate AI response" });
    }
}

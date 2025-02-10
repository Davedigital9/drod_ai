/*import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDbWt7XfEMy3prfuqpYCjCaGgBWAzo-bw0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Define AI in 3 simple sentences";

const result = await model.generateContent(prompt);
console.log(result.response.text());
*/

import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Allow requests from the local   web server
  }));

const genAI = new GoogleGenerativeAI("AIzaSyDbWt7XfEMy3prfuqpYCjCaGgBWAzo-bw0");
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
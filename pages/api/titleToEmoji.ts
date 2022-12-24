import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.movie),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(movie: String) {
return `Convert movie titles into emoji.

Back to the Future: 👨👴🚗🕒 
Batman: 🤵🦇 
Transformers: 🚗🤖 
${movie}:`}
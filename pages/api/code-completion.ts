import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: { body: { product: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { result: string; }): void; new(): any; }; }; }) {
  const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: reviewPrompt(req.body.product),
      max_tokens: 150,
      temperature: 0.8,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0
  });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function reviewPrompt(productName: any) {
    return `Generate a code completion related to questions asked by the client about "${productName}";`
}
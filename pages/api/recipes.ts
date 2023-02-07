import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: { body: { recipe: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { result: string; }): void; new(): any; }; }; }) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Recipe name: ${req.body.recipe}`,
        max_tokens: 2000,
        temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

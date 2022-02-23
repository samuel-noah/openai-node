require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function get_data(){
  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
  
}
get_data()
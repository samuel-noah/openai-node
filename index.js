//setting up environment variables for openai api
require('dotenv').config();


//setting up express
const express = require('express');
const app = express();
const port = process.env.PORT
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

//set the view engine to ejs
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('public'));


//setting up openai api
const { Configuration, OpenAIApi } = require("openai");




app.get('/', (req, res) => {
  res.render('home' , {
    title: 'Home',
    layout: 'layouts/main'
  });

})

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


//listening on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
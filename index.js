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

//setting up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home',{
    title: 'Home',
    layout: 'layouts/main'

  });
})


app.get('/form',(req,res)=>{
  res.render('form',{
    title: 'Form',
    layout: 'layouts/main'
  });
})


app.get('/search', (req, res) => {
  
  //getting the search query 
  const search = req.query
  

  //setting up the openai api
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


  //getting the response from openai api
  async function get_data(){
    const completion = await openai.createCompletion("text-davinci-001", {
      prompt: `${search.talk[0]}`
    });

    

    //rendering the response to the page
    res.render('search' , {
    title: 'Search',
    layout: 'layouts/main',
    completion: completion.data.choices[0].text
  });
  }
  get_data()
  
})


//setting the about page 
app.get('/about', (req, res) => {

  res.render('about', {
    title: 'About',
    layout: 'layouts/main'
  });

})

//listening on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const express = require('express');
const app = express();

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())


const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
// deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');



app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log(prompt);
        const text1 = 'Please give me a Blurb following by this following keyword: ' + prompt;
        console.log(text1);
        deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');
        const resp = await deepai.callStandardApi("text-generator", {
            text: text1
        });

        console.log(resp);
        res.send(resp)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)

    }
})


app.listen(3000, () => {
    console.log('connect to the port 3000');
})
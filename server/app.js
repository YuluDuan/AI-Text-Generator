if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())


app.get('/', async (req, res) => {
    res.status(200).send("Hello from lucy!")

})

app.post('/', async (req, res) => {
    try {
        console.log(req)
        const prompt = req.body.prompt;
        console.log(prompt);

        const text1 = `Please give me a Blurb following by this following keyword:${prompt}`;

        const formData = new FormData();
        formData.append("text", text1);

        console.log(text1);

        const config = {
            method: 'POST',
            headers: {
                'Api-Key': '039372d0-1496-4461-8e6b-c19c3264b606',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: formData,
        };
        const resp = await fetch('https://api.deepai.org/api/text-generator', config)
            .then(response => ({
                status: response.status,
                body: response.json()
            }))
            .then(({ status, body }) => console.log(status, body))
        res.status(401).send(`You are Unauthorized to this API, if you sill want your Blurb associated with ${prompt}. You need to a make a payment :(`);
    } catch (error) {
        console.log("i am error", error);
        res.status(500).send(error)
    }
})


app.listen(3000, () => {
    console.log('connect to the port 3000');
})
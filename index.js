const express = require('express');
const { createCanvas } = require('canvas')
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser')
const helmet = require('helmet');
const morgan = require('morgan')

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/', (req, res) => {
        res.send('hi')
})

app.get('/text', async (req, res) => {
        const text = req.query.a;
        const canvas = createCanvas(200, 100)
        const ctx = canvas.getContext('2d');
        const fontSize = 30;
        const padding = 10;

        // Get the width of the text
        const textWidth = ctx.measureText(text).width;

        // Set the canvas width based on the text width
        canvas.width = textWidth + padding * 100;

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, 100)

        ctx.font = `${fontSize}px Arial`
        ctx.fillStyle = 'black'
        ctx.fillText(text, padding, 50)

        const dataURI = canvas.toDataURL()
        res.send(`<img src = "${dataURI}">`)
});

app.listen(3000, '0.0.0.0', () => {
        console.log('lol port 3000')
})

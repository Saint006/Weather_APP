
const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();

const API_KEY = process.env.API_KEY;


app.get('/',(req,res)=>{
    const address = req.query.address;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`

    axios.get(url).then(response=>{
        const data = response.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;
        res.send(message);

    })
.catch(error=>{
    console.log(error);
    res.status(500).send('error occured');
})

});

app.listen(3000);
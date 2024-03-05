
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();


const API_KEY = process.env.API_KEY;

console.log('API_KEY:', API_KEY);
app.use(cors());

app.get('/',(req,res)=>{
    address = req.query.address;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`
    console.log(url);
    axios.get(url).then(response=>{
        console.log(url);
        const data = response.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const weatherData = {
            cityName: cityName,
            temperature: temperature,
            sunsetTime: sunsetTime
          };
          res.json(weatherData);

    })
.catch(error=>{
    console.log(error);
    res.status(500).send('error occured');
})

});

app.listen(5500,()=>{console.log('connection established....')});
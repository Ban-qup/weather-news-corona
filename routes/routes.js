const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/weather', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/weather.html'));
});

router.post('/getWeather', (req, res) => {
    const apiKey = 'b5fdd2a1af9a0ae8da767e9a8b7e5d81';
    const city = req.body.city;

    if (!city) {
        return res.status(400).json({ error: 'Не указан город в запросе' });
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(response => {
            const weatherData = response.data;
            res.json({ weatherData }); 
        })
        .catch(error => {
            res.status(500).json({ error: 'Ошибка при получении данных о погоде' });
        });
});

router.get('/getNews', async (req, res) => {
    try {
        const apiKey = '6dcf985c19dc4b84ac1de09160364a42'; 
        const apiUrl = 'https://newsapi.org/v2/top-headlines';
        const country = 'us';
        const apiKeyParam = `apiKey=${apiKey}`;
        const url = `${apiUrl}?country=${country}&${apiKeyParam}`;

        const response = await axios.get(url);
        if (response.data && response.data.articles) {
            const newsArticles = response.data.articles;
            res.json({ newsArticles });
        } else {
            res.status(400).json({ error: 'Error fetching news' });
        }
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getAdvice', async (req, res) => {
    try {
        const apiUrl = 'https://api.adviceslip.com/advice';

        const response = await axios.get(apiUrl);
        if (response.data && response.data.slip && response.data.slip.advice) {
            const advice = response.data.slip.advice;
            res.json({ advice });
        } else {
            res.status(400).json({ error: 'Error fetching advice' });
        }
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

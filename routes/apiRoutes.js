const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const db = require('../models')

router.get('/scrape', (req, res) => {
    axios.get('https://www.arstechnica.com/').then((result) => {
        const $ = cheerio.load(result.data);

        $('.article').each((i, element) => {
            const result = {};

            result.title = $(this).find('h2').text();
            result.description = $(this).find('.excerpt').text();
            result.author = $(this).find('.byline a').text();
            result.link = $(this).find('h2 a').attr('href');

            db.Article.create(result).catch(err => {
                console.log(err);
            });
        });

        res.status(200);
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
});

module.exports = router;
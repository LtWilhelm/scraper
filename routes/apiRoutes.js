const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const db = require('../models')

router.get('/scrape', (req, res) => {
    axios.get('https://www.arstechnica.com/').then((result) => {
        const $ = cheerio.load(result.data);

        $('.article').each((i, element) => {
            let result = {};

            result.title = $(this).find('a').text();
            result.description = $(this).find('.excerpt').text();
            result.author = $(this).find('.byline').text();
            result.link = $(this).find('h2 a').attr('href');

            console.log(result)
            // db.Article.create(result).catch(err => {
            //     console.log(err);
            // });
        });

        res.status(200).redirect('/');
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
});

module.exports = router;
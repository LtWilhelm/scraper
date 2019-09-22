const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', (req, res) => {
    db.Article.find({}).then(dbArticles => {
        res.render('index', { articles: dbArticles });
    });
});

module.exports = router;
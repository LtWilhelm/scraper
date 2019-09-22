const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 6969;
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";


app.use('/public', express.static('public'))
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(MONGODB_URI);

app.use(apiRouter);
app.use(htmlRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
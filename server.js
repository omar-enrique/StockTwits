var path = require('path');
var express = require('express');
var session = require('express-session');
var axios = require('axios');

const LOCAL_PORT = 8080;

const app = express();
app.use(session({secret: "stocktwits", resave: false, saveUninitialized: false, cookie: {maxAge: 1000 * 60}}))
	// .use(express.static(path.join(__dirname, 'client', 'build')))
    .use(express.json());
    
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.get('/tweets/:symbol', async(req, res, next) => {
    try {
        const response = await axios.get(`https://api.stocktwits.com/api/2/streams/symbol/${req.params.symbol}.json`);
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

app.listen(process.env.PORT || LOCAL_PORT);
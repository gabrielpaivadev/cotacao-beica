const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fetch = require('node-fetch');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

router.get('/', async function (req, res) {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
    const body = await response.json();
    const dolar = body['USDBRL']['bid'].replace('.', ',')
    const euro = body['EURBRL']['bid'].replace('.', ',')
    const bitcoin = body['BTCBRL']['bid'].replace('.', ',')
    res.render(path.join(__dirname + '/index.html'), { dolar, euro, bitcoin });
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
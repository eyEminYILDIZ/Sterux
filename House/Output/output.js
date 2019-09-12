var express = require("express");
//var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();

var userOutputOperations = require("./OutputOperations/userOutputOperations");
var statisticOutputOperations = require("./OutputOperations/statisticOutputOperations");
var uxOutputOperations = require("./OutputOperations/uxOutputOperations");
var errorOutputOperations = require("./OutputOperations/errorOutputOperations");

// middlewares
app.use(cors());
//app.use(bodyParser.json({ type: 'application/json' }));


app.get('/', function (req, res) {
    var message = "STERUX.House.Output is an api for data provider for STERUX.Monitor\nData collected from STERUX.Agent\n";
    res.end(message);
});

app.get('/api', async function (req, res) {

    var collectionName = req.query.collectionName;
    var type = req.query.type;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;

    var outputOperations = undefined;
    switch (collectionName) {
        case "user":
            outputOperations = userOutputOperations;
            break;
        case "statistic":
            outputOperations = statisticOutputOperations;
            break;
        case "ux":
            outputOperations = uxOutputOperations;
            break;
        case "error":
            outputOperations = errorOutputOperations;
            break;

        default:
            res.end("error");
    }

    var result = undefined;
    switch (type) {
        case "count":
            result = await outputOperations.GetCount(startDate, endDate);
            break;
        case "data":
            result = await outputOperations.GetData(startDate, endDate);
            break;

        default:
            res.end("error");
    }

    res.end(JSON.stringify(result));
});

var port = process.env.INPUT_PORT | 8082;
app.listen(port, () => { console.log("STERUX.House Output Server Started...") });
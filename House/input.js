var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();

var userInputOperations = require("./InputOperations/userInputOperations");
var statisticInputOperations = require("./InputOperations/statisticInputOperations");
var uxInputOperations = require("./InputOperations/uxInputOperations");
var errorInputOperations = require("./InputOperations/errorInputOperations");

// middlewares
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));


app.get('/', function (req, res) {
    var message = "STERUX.House is a place for data that coming from STERUX.Agent\n/Statistic, /Error and /UX are available.";
    res.end(message);
});

app.get('/api/User', function (req, res) {
    var users=userInputOperations.Get();
    res.end(JSON.stringify(users));
});

app.post("/api/User", (req, res) => {
    console.log("User++");
    
    var reqData = req.body;
    var reqType = reqData.type;
    if (reqType == "create") {
        var user = reqData.user;
        user.dateTime = reqData.dateTime;

        var steruxClientId = userInputOperations.Add(user);

        // response
        var response = JSON.stringify({ steruxClientId: steruxClientId });
        res.end(response);
    } else if (reqType == "update") {
        var steruxClientId = reqData.steruxClientId;

        var result = userInputOperations.Update(steruxClientId, reqData.user);
        if (result) {
            res.statusCode(404);
            res.end(JSON.stringify({ result: "An error occured when trying to update user"}));
        } else {
            res.end(JSON.stringify({ result: "success" }));
        }
    }
});



app.get('/api/Statistic', function (req, res) {
    var statistics=statisticInputOperations.Get();
    res.end(JSON.stringify(statistics));
});
app.post("/api/Statistic", (req, res) => {
    var reqData = req.body;
    var reqType = reqData.type;

    console.log("Statistic++");

    if (reqType == "open") {
        var steruxClientId = reqData.steruxClientId;

        var statistic = reqData;
        statistic.steruxClientId = steruxClientId;
        
        statisticInputOperations.Add(statistic);

        res.end(JSON.stringify({ result: "success" }));
    } else if (reqType == "close") {

        var statistic=reqData;
        var result = statisticInputOperations.Update(statistic);
        
        if (result) {
            res.statusCode(404);
            res.end(JSON.stringify({ result: "An error occured when trying to update user"}));
        } else {
            res.end(JSON.stringify({ result: "success" }));
        }
    }

});

app.get('/api/Error', function (req, res) {
    var errors=errorInputOperations.Get();
    res.end(JSON.stringify(errors));
});

app.post("/api/Error", (req, res) => {
    console.log("Error++");
    
    var reqData = req.body;

    var error = reqData;
    errorInputOperations.Add(error);

    res.end(JSON.stringify({ result: "success" }));
});

app.get('/api/UX', function (req, res) {
    var uxs=uxInputOperations.Get();
    res.end(JSON.stringify(uxs));
});

app.post("/api/UX", (req, res) => {
    console.log("UX++");
    
    var reqData = req.body;

    var ux = reqData;
    uxInputOperations.Add(ux);

    res.end(JSON.stringify({ result: "success" }));
});

var port = process.env.INPUT_PORT | 8081;
app.listen(port, () => { console.log("STERUX.House Input Server Started...") });
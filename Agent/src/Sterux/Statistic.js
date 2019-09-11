var openTime = undefined;

function StatisticOnLoad() {

    console.log("st:onload");

    // this will use for update statistic data at the server with OnUnLoad Data
    openTime = new Date().getTime();

    var payload = {
        type: "open",
        openTime: openTime + "",
        referrer: document.referrer,
        startTime: new Date().toJSON(),
    };
    Send_Statistic(payload);

    console.log("statistic send");
}

function StatisticOnUnLoad() {

    var payload = {
        type: "close",
        openTime: openTime,
        endTime: new Date().toJSON(),
    };
    Send_Statistic(payload);
}
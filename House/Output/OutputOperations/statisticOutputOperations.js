var easyElasticSearch = require("easy-elasticsearch");

var statisticOutputOperations = {

    statisticIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "statistic"
    }),

    GetCount: async function (startDate, endDate) {
        var count = await this.statisticIndexClient.GetCountByDateRangeAsync("dateTime", startDate, endDate);
        return count;
    },

    GetData: async function (startDate, endDate) {
        var objects = await this.statisticIndexClient.GetObjectsByDateRangeAsync("dateTime", startDate, endDate);
        return objects;
    }
}

module.exports = statisticOutputOperations;
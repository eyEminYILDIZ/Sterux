var easyElasticSearch = require("easy-elasticsearch");

var errorOutputOperations = {

    errorIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "error"
    }),

    GetCount: async function (startDate, endDate) {
        var count = await this.errorIndexClient.GetCountByDateRangeAsync("dateTime", startDate, endDate);
        return count;
    },

    GetData: async function (startDate, endDate) {
        var objects = await this.errorIndexClient.GetObjectsByDateRangeAsync("dateTime", startDate, endDate);
        return objects;
    }
}

module.exports = errorOutputOperations;
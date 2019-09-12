var easyElasticSearch = require("easy-elasticsearch");

var userOutputOperations = {

    userIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "user"
    }),

    GetCount: async function (startDate, endDate) {
        var count = await this.userIndexClient.GetCountByDateRangeAsync("dateTime", startDate, endDate);
        return count;
    },

    GetData: async function (startDate, endDate) {
        var objects = await this.userIndexClient.GetObjectsByDateRangeAsync("dateTime", startDate, endDate);
        return objects;
    }
}

module.exports = userOutputOperations;
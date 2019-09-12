var easyElasticSearch = require("easy-elasticsearch");

var uxOutputOperations = {

    uxIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "user"
    }),

    GetCount: async function (startDate, endDate) {
        var count = await this.uxIndexClient.GetCountByDateRangeAsync("dateTime", startDate, endDate);
        return count;
    },

    GetData: async function (startDate, endDate) {
        var objects = await this.uxIndexClient.GetObjectsByDateRangeAsync("dateTime", startDate, endDate);
        return objects;
    }
}

module.exports = uxOutputOperations;
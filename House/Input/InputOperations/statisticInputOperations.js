var easyElasticSearch = require("easy-elasticsearch");

var statisticInputOperations = {

    statisticIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "statistic"
    }),

    DeleteAllDocuments: async function () {
        var objects = await this.statisticIndexClient.GetAllAsync();
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            await this.statisticIndexClient.DeleteByIdAsync(obj._id);
        }
    },

    Get: async function () {
        var objects = await this.statisticIndexClient.GetAllAsync();
        return objects;
    },

    Add: async function (statistic) {
        var result = await this.statisticIndexClient.CreateObjectAsync(statistic);
        return result;
    },

    Update: async function (statistic) {
        // get operation: Obtain oldStatisticId by clientId and openTime
        var matchedObjets = await this.statisticIndexClient.GetAllByKeyValuesAsync({
            steruxClientId: statistic.steruxClientId,
            openTime: statistic.openTime
        });
        var oldStatisticId = matchedObjets[0]._id;

        // update operation
        var result = await this.statisticIndexClient.UpdateByIdAsync(oldStatisticId, {
            type: statistic.type,
            endTime: statistic.endTime
        });
        return result;

    }// endof: Update()

}

module.exports = statisticInputOperations;
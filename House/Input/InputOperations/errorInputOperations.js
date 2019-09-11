var easyElasticSearch = require("easy-elasticsearch");

var uxInputOperations = {

    errorIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "error"
    }),

    DeleteAllDocuments: async function () {
        var objects = await this.errorIndexClient.GetAllAsync();
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            await this.errorIndexClient.DeleteByIdAsync(obj._id);
        }
    },

    Get: async function () {
        var objects = await this.errorIndexClient.GetAllAsync();
        return objects;
    },
    Add: async function (error) {
        var result = await this.errorIndexClient.CreateObjectAsync(error);
        return result;
    },
}

module.exports = uxInputOperations;
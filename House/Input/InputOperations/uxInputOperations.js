var easyElasticSearch = require("easy-elasticsearch");

var uxInputOperations = {

    uxIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "ux"
    }),

    DeleteAllDocuments: async function () {
        var objects = await this.uxIndexClient.GetAllAsync();
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            await this.uxIndexClient.DeleteByIdAsync(obj._id);
        }
    },

    Get: async function () {
        var objects = await this.uxIndexClient.GetAllAsync();
        return objects;
    },
    Add: async function (ux) {
        var result = await this.uxIndexClient.CreateObjectAsync(ux);
        return result;
    },
}

module.exports = uxInputOperations;
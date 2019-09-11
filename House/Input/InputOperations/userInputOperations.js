var easyElasticSearch = require("easy-elasticsearch");

var userInputOperations = {

    userIndexClient: easyElasticSearch.CreateIndexClient({
        host: 'localhost:9200',
        index: "user"
    }),

    DeleteAllDocuments: async function () {
        var objects = await this.userIndexClient.GetAllAsync();
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            await this.userIndexClient.DeleteByIdAsync(obj._id);
        }
    },

    Get: async function () {
        var objects = await this.userIndexClient.GetAllAsync();
        return objects;
    },
    Add: async function (user) {
        // result will be created_object_id value
        var result = await this.userIndexClient.CreateObjectAsync(user);
        return result;
    },

    Update: async function (id, user) {
        // note: for this case: the steruxClientId also the id of elasticsearch object. 
        // so that can use as object id on the methods such as Update() etc. 
        // but in each usecase that may not be like this. So for do not face compability problem in future, we used like this 

        // get operation: Obtain oldUserId by clientId
        var matchedObjets = await this.userIndexClient.GetAllByKeyValuesAsync({
            steruxClientId: id
        });
        var oldUserId = matchedObjets[0]._id;

        // update operation
        var result = await this.userIndexClient.UpdateByIdAsync(oldUserId, {
            isLogined: user.isLogined
        });
        return result;

    }// endof: Update()

}

module.exports = userInputOperations;
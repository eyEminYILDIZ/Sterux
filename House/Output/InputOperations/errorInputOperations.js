var uxInputOperations = {

    objects: [],

    Get: function () {
        return this.objects;
    },
    Add: function (error) {
        //saving operations...
        this.objects.push(error);
    },
}

module.exports = uxInputOperations;
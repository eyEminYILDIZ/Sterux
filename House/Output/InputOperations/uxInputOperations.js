var uxInputOperations = {

    objects: [],

    Get: function () {
        return this.objects;
    },
    Add: function (ux) {
        //saving operations...
        this.objects.push(ux);
    },
}

module.exports = uxInputOperations;
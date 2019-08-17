var statisticInputOperations={

    objects:[],

    Get:function(clientId, openTime){
        if(clientId==undefined && openTime==undefined)
            return this.objects;
        else
            return this.objects.find(w=>w.steruxClientId==clientId && w.openTime==openTime);
    },
    Add:function(statistic){
        //saving operations...
        this.objects.push(statistic);
    },

    Update:function(statistic){
        // get operation:
        var oldStatistic=this.Get(statistic.steruxClientId,statistic.openTime);
        if(oldStatistic==undefined)
            return false;
        
        // update operation
        // WBI
        oldStatistic.type=statistic.type;
        oldStatistic.endTime = statistic.endTime;
    }

}

module.exports=statisticInputOperations;
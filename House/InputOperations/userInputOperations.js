var userInputOperations={

    objects:[],

    GenerateUniqClientId:function(){
        return "90890183918938198393";
    },
    Get:function(id){
        if(id==undefined)
            return this.objects;
        else
            return this.objects.find(w=>w.steruxClientId==id);
    },
    Add:function(user){
        // generate uniq client id for new user
        var steruxClientId=this.GenerateUniqClientId();
        user.steruxClientId = steruxClientId;

        //saving operations...
        this.objects.push(user);

        // return generated client id
        return steruxClientId;
    },

    Update:function(id, user){
        // get operation:
        var oldUser=this.Get(id);
        if(oldUser==undefined)
            return false;
        
        // update operation
        // WBI
        oldUser.isLogined=user.isLogined;
    }

}

module.exports=userInputOperations;
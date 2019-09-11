// direct sending:
function Send_UserInformation(payload) {
    var sendUrl = "/User";
    var result = Send(sendUrl, payload);
}

// Queued Sendings:
function Send_Statistic(payload) {
    var sendUrl = "/Statistic";
    AddSendQueue(sendUrl, payload);
}

function Send_UserExperence(payload) {
    var sendUrl = "/UX";
    AddSendQueue(sendUrl, payload);
}

function Send_Error(payload) {
    var sendUrl = "/Error";
    AddSendQueue(sendUrl, payload);
}


// ------------------ QUEUE OPEATIONS --------------------------
var sendQueue = [];
var isQueueOperating = false;

function AddSendQueue(sendUrl, payload) {

    payload.url = window.location.pathname;
    payload.steruxClientId = getSteruxClientIdCookie();
    payload.dateTime =new Date().toJSON();

    sendingJob = { url: sendUrl, payload: payload };
    sendQueue.push(sendingJob);

    // if userId has not received: wait for it
    var steruxClientId = getSteruxClientIdCookie();
    if (steruxClientId == undefined)
        return;

    // if queue is on operation, skip trigger the operating
    if (isQueueOperating)
        return;
    else
        executeSendQueue();
    ;

}

function executeSendQueue() {
    isQueueOperating = true;
    // if userId is available:
    while (sendQueue.length > 0) {
        var sendingJob = sendQueue[0];
        sendQueue.splice(0, 1);
        Send(sendingJob.url, sendingJob.payload);
    }
    isQueueOperating = false;
}


// ------------------ SEND OPEATIONS --------------------------

function Send(_url, _payload) {

   // console.log(url);
   // console.log(payload);
    //*********************************************************************************** */

    var http = new XMLHttpRequest();
    var data = JSON.stringify(_payload);
    var url = SteruxOptions.ServiceUrl+_url;
    var httpType = "POST";

    try {
        http.open(httpType, url, true);

        //Send the proper header information along with the request
        //http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.setRequestHeader('Content-type', 'application/json');

        // setting custom http headers:
        // http.setRequestHeader(key, value);

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                
                // 'http.responseText' is response from server

                if (_url == "/User") {
                    
                    // update sterux login status on cookie
                    var loginStatus = (_payload.user.isLogined) ? "true" : "false";
                    addOrUpdateSteruxLoginStatusCookie(loginStatus);
            
                    // if type is create; the response contains SteruxClientID
                    // store it on cookie
                    if (_payload.type == "create") {
                        var result = JSON.parse(http.responseText);
                        var steruxClientId = result.steruxClientId;
                        addOrUpdateSteruxClientIDCookie(steruxClientId);
            
                        console.log(steruxClientId);

                        executeSendQueue();
                    }
                    else {
                        console.log("Could not getting Sterux Client Id from server");
                    }
                }

            } // endof: HTTP.OK
            if (http.readyState == 4 && http.status != 200) {
                console.log("Error. Operation failed.");
                console.log(http.responseText);
            } // endof: HTTP.ERROR
        }

        http.send(data);

    } catch (exeption) {
        console.log("Error. Operation failed.");
        console.log(exeption.message);
    }


    //*********************************************************************************** */

    var result = JSON.parse(JSON.stringify({ steruxClientId: '4545485212165848521' }));

    
}


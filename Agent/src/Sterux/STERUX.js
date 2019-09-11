var SteruxOptions;
var userId;

function STERUXOnLoad() {

    // if there is not steruxClientId, send user information and set it with response
    var steruxClientId = getSteruxClientIdCookie();
    var steruxClientLoginStatus = getSteruxLoginStatusCookie();
    var isUserLogined = (getLoginedUserCookie() == undefined) ? false : true;

    if (steruxClientId == undefined) { 
        // client opening the page first time, it have to send user information for getting steruxClientID
        var payload = {
            type:"create",
            steruxClientId:undefined,
            user: GetUserInformations(),
            dateTime: new Date().toJSON(),
        }
        // user login status
        payload.user.isLogined = isUserLogined;

        Send_UserInformation(payload);

    } else if (steruxClientId != undefined && steruxClientLoginStatus == "false" && isUserLogined == true) {
        // if there is steruxClientID, and user logined but steruxClientLogin status is false
        // it have to informed the server for update current user as logined
        var payload = {
            type:"update",
            steruxClientId:steruxClientId,
            dateTime: new Date().toJSON(),
            user: {},
        }
        // user login status
        payload.user.isLogined = isUserLogined;

        Send_UserInformation(payload);
    }else (steruxClientId != undefined && steruxClientLoginStatus == "false" && isUserLogined == true)
}

function SteruxInit(option) {
    SteruxOptions = option;

    window.addEventListener('load', STERUXOnLoad);

    if (SteruxOptions.modules.statistic) {
        window.addEventListener('load', StatisticOnLoad);
        window.addEventListener('unload', StatisticOnUnLoad);
    }

    if (SteruxOptions.modules.ux) {
        window.addEventListener('load', UserExperienceOnLoad);
        window.addEventListener('unload', UserExperienceOnUnLoad);

        window.addEventListener('scroll', Scroll);
    }

    if (SteruxOptions.modules.error) {
        window.addEventListener('load', ErrorOnLoad);
        window.addEventListener('unload', ErrorOnUnLoad);
        window.addEventListener('error', Error);
    }

}


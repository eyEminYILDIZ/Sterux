var steruxCookieKey = "steruxUniqKey";
var steruxLoginStatusKey="steruxLoginStatusKey";

var getSteruxOptions=function(){
    return SteruxOptions;
}
// -------------------------- GET --------------------------------------

// this return Sterux Client ID
function getSteruxClientIdCookie() {
    return getCookie( steruxCookieKey);
}

// this returns Sterux Client Login Status
function getSteruxLoginStatusCookie() {
    return getCookie(steruxLoginStatusKey);
}

// this returns Logined User Cookie 
function getLoginedUserCookie(){
    return getCookie(getSteruxOptions().loginedUserCookieKey);
}

function getCookie(cookieKey) {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
        var key = multiple[i].split("=");
        if (key[0].trim() == cookieKey)
            return key[1];
    }
    return undefined;
}

// -------------------------- Add Or Update --------------------------------------

function addOrUpdateSteruxClientIDCookie(value) {
    return addOrUpdateCookie( steruxCookieKey , value);
}

function addOrUpdateSteruxLoginStatusCookie(value) {
    return addOrUpdateCookie( steruxLoginStatusKey , value);
}

function addOrUpdateLoginedUserCookie(value) {
    return addOrUpdateCookie( getSteruxOptions().loginedUserCookieKey , value);
}

function addOrUpdateCookie(key,value) {
    var now = new Date();
    now.setMinutes(now.getMinutes() + 20);
    var dateString = now.toUTCString();

    document.cookie = key + "=" + value + "; expires=" + dateString + "; path:/";
}

// -------------------------- REMOVE --------------------------------------
function removeSteruxCookie() {
    document.cookie = steruxCookieKey + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path:/";
}

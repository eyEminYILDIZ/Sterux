function GetUserInformations() {
    
    var user = {

        browserName: navigator.appName,
        browserEngine:  navigator.product ,
        browserVersion1a:  navigator.appVersion ,
        browserVersion1b:  navigator.userAgent ,
        browserLanguage:  navigator.language ,
        browserOnline:  navigator.onLine ,
        browserPlatform:  navigator.platform ,
        timezone:(new Date()).getTimezoneOffset()/60,
        // javaEnabled(){return navigator.javaEnabled(),
        dataCookiesEnabled:  navigator.cookieEnabled ,
        // dataCookies1:  document.cookie ,
        // dataCookies2:  decodeURIComponent(document.cookie.split(";")) ,
        // dataStorage:  localStorage ,
        sizeScreenW:  screen.width ,
        sizeScreenH:  screen.height ,
        // sizeDocW(){return document.width,
        // sizeDocH(){return document.height,
        // sizeInW(){return innerWidth,
        // sizeInH(){return innerHeight,
        // sizeAvailW(){return screen.availWidth,
        // sizeAvailH(){return screen.availHeight,
        // scrColorDepth(){return screen.colorDepth,
        // scrPixelDepth(){return screen.pixelDepth,
        // latitude:  position.coords.latitude ,
        // longitude:  position.coords.longitude ,
        // accuracy:  position.coords.accuracy ,
        // altitude(){return position.coords.altitude,
        // altitudeAccuracy(){return position.coords.altitudeAccuracy,
        // heading(){return position.coords.heading,
        // speed(){return position.coords.speed,
        // timestamp(){return position.timestamp,
    };

    return user;

}
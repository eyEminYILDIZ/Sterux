
function UserExperienceOnLoad() {
    console.log("ux:onload");

    var steruxClick = "steruxClick";

    // add click listener to body
    document.getElementsByTagName("BODY")[0].addEventListener('click', function (e) {
        for (var i = 0; i < e.path.length - 2; i++) {
            var element = e.path[i];
            if (element.getAttribute(steruxClick) != undefined) {

                var payload = {
                    elementName: element.getAttribute(steruxClick),
                    eventType: "Click",
                };
                Send_UserExperence(payload);
            }
        }
    }, false);

    // for first run:
    Scroll();
}

function UserExperienceOnUnLoad() {

}

var steruxView="steruxView";

function Scroll() {

    var elements = document.querySelectorAll('['+steruxView+']');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.getAttribute("viewControlViewed") == null) {
            if (isElementOnViewPort(element)) {
                element.setAttribute("viewControlViewed", true);

                var payload = {
                    elementName: element.getAttribute(steruxView),
                    eventType: "View",
                };
                Send_UserExperence(payload);
            }
        }
    }

}



// Functions:

function isElementOnViewPort(el) {
    try {
        var rect = el.getBoundingClientRect();
        // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
        var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
        var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);

    } catch (error) {
        return false;
    }
}
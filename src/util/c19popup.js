// COVID-19 Popup

window.onload = function () {
    // Grab cookie and split into individual KVPs.
    var cookie = decodeURIComponent(document.cookie);
    var cookieArray = cookie.split(';');

    // Loop through cookies.
    for (var i = 0; i < cookieArray.length; i++) {
        // If we can't find the popup cookie, create and show the popup.
        if (cookieArray[i].indexOf("c19popup") == -1) {
            var popupEl = document.createElement("div");
            popupEl.innerHTML = "<img src='/img/2020_gel_popup-01-01.jpg' alt='Gel is Open' />";
            popupEl.style = "position: fixed; top: 0; width: 100 %; height: 100 %; z - index: 999; display: grid; justify - content: center; background: rgba(0, 0, 0, 0.35);";

            document.body.appendChild(popupEl);
        }
    }

    // Set expiry for cookie.
    var exDays = 7; // Expires in 7 days
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (exDays * 24 * 60 * 60 * 1000));

    // Set cookie so it doesn't pop up again until expiry.
    popupEl.addEventListener("click", function () {
        document.cookie = "c19popup=closed;expires=" + expiry.toUTCString() + ";path=/";
        popupEl.remove();
    });
};
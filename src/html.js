import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
              <script dangerouslySetInnerHTML={{
                  __html: `
                        // COVID-19 Popup

                        window.onload = function () { setTimeout(createPopup, 5000); }

                        function createPopup() {
                            // Grab cookies.
                            var cookies = decodeURIComponent(document.cookie);

                            // If we can't find the popup cookie, create and show the popup.
                            if (cookies.indexOf("c19popup") == -1) {
                                var popupEl = document.createElement("div");
                                popupEl.innerHTML = "<img src='/img/2020_gel_popup-01-01.jpg' alt='Gel is Open' style='height:739px; max-height:100%; margin:0 auto;' />";
                                popupEl.style = "position:fixed; top:0; width:100%; height:100%; z-index:999; display:grid; justify-content:center; align-content:center; background:rgba(0, 0, 0, 0.35);";

                                document.body.appendChild(popupEl);
                            }

                            // Set expiry for cookie.
                            var exDays = 7; // Expires in 7 days
                            var expiry = new Date();
                            expiry.setTime(expiry.getTime() + (exDays * 24 * 60 * 60 * 1000));

                            // Set cookie so it doesn't pop up again until expiry.
                            popupEl.addEventListener("click", function() {
                                document.cookie = "c19popup=closed;expires=" + expiry.toUTCString() + ";path=/";
                                popupEl.style.display = "none";
                            });
                        };
                  `
              }} />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
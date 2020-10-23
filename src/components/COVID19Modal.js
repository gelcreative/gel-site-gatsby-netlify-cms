import React from 'react';
import { navigate } from "gatsby-link";
import styled from 'styled-components'

class COVID19ModalMaker extends React.Component {

  render() {
    return (
      <div className="gel-COVID19-modal-maker" ></div>
    )
  }

}

// COVID-19 Modal
COVID19ModalMaker.onload = function () { setTimeout(createPopup, 5000); }

function createPopup() {
    // Grab cookies.
    var cookies = decodeURIComponent(document.cookie);

    // If we can't find the popup cookie, create and show the popup.
    if (cookies.indexOf("c19popup") === -1) {
        var popupEl = document.createElement("div");
        popupEl.innerHTML = "<img src='/img/2020_gel_popup-01-01.jpg' alt='Gel is Open' style='height:739px; max-height:100%; margin:0 auto;' />";
        popupEl.style = "position:fixed; top:0; width:100%; height:100%; z-index:999; display:grid; justify-content:center; align-content:center; background:rgba(0, 0, 0, 0.35); opacity:0; transition:opacity 0.5s;";

        document.body.appendChild(popupEl);
        popupEl.style.opacity = 1;
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

export default COVID19ModalMaker
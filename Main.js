// ==UserScript==
// @version      1.0.3
// @author       Diablosito33
// @name         GoGoAnime.io - Costum Style
// @description  Made with CSS+JS to alternatively custom web page style
// @namespace    https://github.com/Diablosito33/GoGoAnime.Io-CustomStyle
// @homepageURL  https://github.com/Diablosito33/GoGoAnime.Io-CustomStyle
// @updateURL    https://raw.githubusercontent.com/Diablosito33/GoGoAnime.Io-CustomStyle/master/Main.js
// @downloadURL  https://raw.githubusercontent.com/Diablosito33/GoGoAnime.Io-CustomStyle/master/Main.js
// @match        https://www9.gogoanime.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
// 1. Create the button
var btnCiname = document.createElement("button");
btnCiname.innerHTML = "Do Something";

// 2. Append somewhere
var placeAppend = document.getElementsByClassName('favorites_book')[0].parentNode;
    placeAppend.appendChild(btnCiname);
    
// 3. Add event handler
button.addEventListener ("click", foo() {
  alert("did something");
});

})();

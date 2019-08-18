// ==UserScript==
// @version      1.0.4
// @author       Anjolo96
// @name         GoGoAnime.io - Custom Style
// @description  Cinema Mode + Visited links + Cleaning...
// @namespace    https://github.com/Anjolo96/GoGoAnime.Io-CustomStyle
// @homepageURL  https://github.com/Anjolo96/GoGoAnime.Io-CustomStyle
// @updateURL    https://raw.githubusercontent.com/Anjolo96/GoGoAnime.Io-CustomStyle/master/Main.js
// @downloadURL  https://raw.githubusercontent.com/Anjolo96/GoGoAnime.Io-CustomStyle/master/Main.js
// @match        https://www9.gogoanime.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    //any css added with this function afect entire web page
    function addGlobalStyle(css) { 
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

// this is just the styling, wont detail here :|
addGlobalStyle('#episode_related li :visited { background-color: #252525; color: #a2790b;}');
addGlobalStyle('#episode_related li .active { background-color: #d29b06; color: #fff; }');
addGlobalStyle('#episode_related li :hover { background-color: #ffc119; color: #fff; }');
addGlobalStyle('#btnCinema { float: left; margin-left: 10px; cursor: pointer; background-color: #363636; line-height: 25px; padding: 0 10px; }');
addGlobalStyle('#btnCinema:hover { background-color: #d29b06; color: #fff; }');
addGlobalStyle('.anime_video_body_watch { position: relative; z-index: 2;; }');
addGlobalStyle('.dark { cursor: pointer; top: 0px; width: 100%; height: 100%; z-index: 1; left: 0px; position: fixed; background-color: #000000d4; }');
addGlobalStyle('nav.menu_series ul li a:visited { color: #a2790b; }');
addGlobalStyle('.anime_video_body_episodes a:visited { color: #a2790b; }');


// Create the div for button itself
var btnCinema = document.createElement("div"); 
    btnCinema.id = "btnCinema";
    // the icon...
var iconCinema = document.createElement("i"); 
    iconCinema.classList.add('fa');
    iconCinema.classList.add('fa-lightbulb-o');
    iconCinema.style.padding = "0px 5px 0px 0px";
    // the text...
var spanCinema = document.createElement("i"); 
    spanCinema.innerHTML = "Cinema Mode";
// Create the div for overlay
var darkOverlay = document.createElement("div");
    darkOverlay.id = "darkOverlay";

// Append the button we just created
var appendCinema = document.getElementsByClassName('favorites_book')[0].parentNode;
    appendCinema.appendChild(btnCinema);
    btnCinema.appendChild(iconCinema);
    btnCinema.appendChild(spanCinema);
// Append the overlay to the bottom of page
var appendOverlay = document.getElementsByTagName('body')[0];
    appendOverlay.appendChild(darkOverlay);


// Cliking button is the same as clicking the dark overlay...
darkOverlay.addEventListener ("click", function() { switchDarkMode(); });
btnCinema.addEventListener ("click", function() { switchDarkMode(); });

//obviously it starts hidden... The cinema mode
var darkEnabled = false; 
var overlay = document.getElementById('darkOverlay');
    function switchDarkMode(){
        darkEnabled = !darkEnabled; //like math (X times -1 = -X) or even (-X times -1 = X) http://prntscr.com/ou8pxr
        if(darkEnabled){
        overlay.className = "";
        } else {
            overlay.className = "dark";
        }
    }

// After "Please, reload page if you can't watch the video" gap wich countains a strange script, let's just delete...
var bigSpace = document.getElementsByClassName('anime_video_body_cate')[0].children[4];
    bigSpace.hidden = true;
})();

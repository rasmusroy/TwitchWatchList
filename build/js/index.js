function addChannel(){channels.push(channelInput.value)}function links(){$("body").on("click","a",function(){return chrome.tabs.create({url:$(this).attr("href")}),!1})}function channelInfoCall(){channels.forEach(function(n){function e(n,e){return"https://api.twitch.tv/kraken/"+n+"/"+e+"?client_id=f1kmn05e2nylo6c3vvcrmt88xxd9g0"}$.getJSON(e("streams",n),function(t){var a,l;null===t.stream?(a="Offline",l="offline"):void 0===t.stream?(a="Can't find account",l="offline"):(a=t.stream.game,l="online"),$.getJSON(e("channels",n),function(e){var t=null!=e.logo?e.logo:"https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png",i=null!=e.display_name?e.display_name:n,r="online"===l?""+e.status:"";html='<div class="channel-element col-xs-12 '+l+'"> <div class="streamer-avatar"> <img src="'+t+'"> </div> <div class="streamer-info"> <div class="streamer-name"> <a class="stream-link" href="https://www.twitch.tv/'+i+'">'+i+'</a> </div> <div class="streamer-game"> Streaming  <a href="https://www.twitch.tv/directory/game/'+a+'">'+a+'</a> </div> </div> <div class="streamer-title">'+r+"</div> </div>","online"===l?$(".stream-container").prepend(html):$(".stream-container").append(html)})})})}var channels=["ESL_CSGO","alignftw","HeroHarmony","ESL_SC2","ESL_LOL","ESL_Overwatch","ESL_Heroes","ESL_DOTA2"];document.addEventListener("DOMContentLoaded",function(){channelInfoCall(),links()});var channelInput=document.getElementById("channelName");
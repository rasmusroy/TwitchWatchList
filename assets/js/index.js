var channels = ["ESL_CSGO","alignftw","HeroHarmony","ESL_SC2","ESL_LOL","ESL_Overwatch","ESL_Heroes","ESL_DOTA2"];

// $(document).ready(function() {
//   channelInfoCall();
//   links();
// });

document.addEventListener('DOMContentLoaded', function() {
  channelInfoCall();
  links();
});

var channelInput = document.getElementById("channelName");

function addChannel() {
  channels.push(channelInput.value);
}
function links() {
  $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
}
// API CALL FUNCTION
function channelInfoCall() {
  channels.forEach(function(channel) {
    function streamURL(type, name) {
      // return 'https://wind-bow.hyperdev.space/twitch-api/' + type + '/' + name + '?callback=?';
      return 'https://api.twitch.tv/kraken/' + type + '/' + name +'?client_id=f1kmn05e2nylo6c3vvcrmt88xxd9g0';
    };
    $.getJSON(streamURL("streams", channel), function(data) {
      var game,
          status;
      
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Can't find account";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(streamURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png",
            name = data.display_name != null ? data.display_name : channel,
            description = status === "online" ? '' + data.status : "";
            html = '<div class="channel-element col-xs-12 ' + status +'"> <div class="streamer-avatar"> <img src="' + 
            logo + '"> </div> <div class="streamer-info"> <div class="streamer-name"> <a class="stream-link" href="https://www.twitch.tv/'+ name +'">' + 
            name + '</a> </div> <div class="streamer-game"> Streaming  <a href="https://www.twitch.tv/directory/game/'+ game +'">' + 
            game + '</a> </div> </div> <div class="streamer-title">' + 
            description + '</div> </div>';
        //Sorts Streams by Online or Offline
        status === "online" ? $(".stream-container").prepend(html) : $(".stream-container").append(html)
      });
      
    });
  });
};






/* API CALL
$.getJSON("http://wind-bow.hyperdev.space/twitch-api/streams/esl_sc2?callback=?", function(streamData) {
  console.log(streamData);
});
*/
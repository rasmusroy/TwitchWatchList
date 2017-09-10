// Runs functions when Extension is opened
document.addEventListener('DOMContentLoaded', function () {
  channelInfoCall();
  links()

  // ADD TO ARRAY FUNCTION
  var addButton = document.getElementById('addChannelBtn');

  addButton.addEventListener('click', function () {
    var inputField = document.getElementById('channelNameInput');
    var inputFieldValue = inputField.value;

    if (!inputFieldValue) {
      console.log('Error: No value specified');
      return;
    }
    chrome.storage.sync.get({
      storedChannels: []
    }, function (data) {
      storedArray = data.storedChannels;
      storedArray.push(inputFieldValue);
      chrome.storage.sync.set({
        'storedChannels': storedArray
      }, function () {
        // Notify that we saved.
        console.log('Settings saved');
        location.reload();
      });
    });
  });
});


// API CALL FUNCTION
function channelInfoCall() {

  // Gets Array from Chrome Local Storage
  chrome.storage.sync.get({
    storedChannels: []
  }, function (data) {
    // console.log(data.storedChannels);

    data.storedChannels.forEach(function (channel) {
      // Function takes in type and name and returns it with the api url.
      function streamURL(type, name) {
        return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?client_id=f1kmn05e2nylo6c3vvcrmt88xxd9g0';
      };
      // Initiates the function and runs once for each object in channel.
      // First tests if the stream is offline or online.
      $.getJSON(streamURL("streams", channel), function (data) {
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

        // Gets the channel Data and adds the html.
        $.getJSON(streamURL("channels", channel), function (data) {
          var logo = data.logo != null ? data.logo : "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png",
            name = data.display_name != null ? data.display_name : channel,
            url = data.url,
            description = status === "online" ? '' + data.status : "";

          html = `
              <div class="channel-element ${status}">
                <div class="streamer-avatar"> <a href="${url}"><img src="${logo}"></a></div>
                <div class="streamer-info">
                  <div class="streamer-name"> <a class="stream-link" href="${url}"${name}">${name}</a> </div>
                  <div class="streamer-game"> Streaming  <a href="https://www.twitch.tv/directory/game/${game}">${game}</a> </div>
                </div>
                <div class="streamer-title">${description}</div>
              </div>`;

          // Sorts Streams by Online or Offline and adds it to the html.
          status === "online" ? $(".stream-container").prepend(html) : $(".stream-container").append(html)
        });

      });
    });
  });
};

// Function making links work in the extension
function links() {
  $('body').on('click', 'a', function () {
    chrome.tabs.create({
      url: $(this).attr('href')
    });
    return false;
  });
};


// [
// 	"ESL_CSGO",
// 	"alignftw",
// 	"ESL_SC2",
// 	"ESL_LOL",
// 	"ESL_Overwatch",
// 	"ESL_Heroes",
// 	"ESL_DOTA2",
// 	"wheeze202",
// 	"KingGothalion",
// 	"HeroHarmony"
// ]
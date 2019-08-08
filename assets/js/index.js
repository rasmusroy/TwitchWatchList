// Background check list of id's for online streams.
// Get channel info if online

// Check webcomponents to create own component?
// https://www.codementor.io/ayushgupta/vanilla-js-web-components-chguq8goz

document.addEventListener("DOMContentLoaded", function() {
  getChannelInfo();

  var addButton = document.getElementById("addChannelBtn");
  var inputField = document.getElementById("channelNameInput");

  addButton.addEventListener("click", function() {
    event.preventDefault();

    const inputFieldValue = inputField.value.toLowerCase();
    let userId;

    if (!inputFieldValue) {
      console.log("Error: No value specified");
      return;
    }
    fetch(convertURL(inputFieldValue), {
      method: "GET",
      headers: {
        accept: "application/vnd.twitchtv.v5+json",
        "client-id": "gnvnwcw3bqrjx6gjcydm3fkmbgxmga"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        userId = data.users[0]._id;
        chrome.storage.sync.get(["storedChannels"], function(data) {
          let channelsArray;
          channelsArray = data.storedChannels;
          channelsArray.push(userId);
          chrome.storage.sync.set(
            {
              storedChannels: channelsArray
            },
            function() {
              // Notify that we saved.
              console.log("Settings saved");
              location.reload();
            }
          );
        });
      });
  });
});

function getChannelInfo() {
  chrome.storage.sync.get(["storedChannels"], function(data) {
    data.storedChannels.map(channel => {
      fetch(streamURL("channels", channel))
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
        });
    });
  });
}

// Utility Functions
function convertURL(name) {
  return "https://api.twitch.tv/kraken/users?login=" + name;
}

function streamURL(type, id) {
  return (
    "https://api.twitch.tv/kraken/" +
    type +
    "/" +
    id +
    "?client_id=gnvnwcw3bqrjx6gjcydm3fkmbgxmga"
  );
}

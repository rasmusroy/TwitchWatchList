// Runs functions when Extension is opened
document.addEventListener('DOMContentLoaded', function () {
  channelInfoCall();
  links();
  checkForEmptyState();

  // ADD TO ARRAY FUNCTION
  var addButton = document.getElementById('addChannelBtn');

  addButton.addEventListener('click', function () {
    var inputField = document.getElementById('channelNameInput');
    var inputFieldValue = inputField.value.toLowerCase();

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

// RUNS WHEN THE DOM IS MODIFIED
document.addEventListener('DOMSubtreeModified', function () {

  let button = null;
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  const removeChannel = function () {
    var itemToDelete = this.id.toLowerCase();

    chrome.storage.sync.get({
      storedChannels: []
    }, function (data) {
      storedArrayN = data.storedChannels;
      var i = storedArrayN.indexOf(itemToDelete);
      if (i != -1) {
        storedArrayN.splice(i, 1);
      }
      chrome.storage.sync.set({
        'storedChannels': storedArrayN
      }, function () {
        // Notify that we saved.
        console.log('Settings saved');
        location.reload();
      });
    });
  }

  for (let i = 0; i < deleteButtons.length; i++) {
    button = deleteButtons[i];
    button.addEventListener('click', removeChannel);
  }
});


// API CALL FUNCTION
function channelInfoCall() {

  // Gets Array from Chrome Local Storage
  chrome.storage.sync.get({
    storedChannels: []
  }, function (data) {

    data.storedChannels.forEach(function (channel) {
      // Function takes in type and name and returns it with the api url.
      function streamURL(type, name) {
        return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?client_id=f1kmn05e2nylo6c3vvcrmt88xxd9g0';
      };


      let game = "Can't find account";
      let status = "offline";
      let logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png";
      let name = channel;


      // Initiates the function and runs once for each object in channel.
      // First tests if the stream is offline or online.
      fetch(streamURL("streams", channel))
      .then((response) => {
          return response.json();
      })
      .then((data) => {
        if (data.stream === null) {
          game = "Offline";
        } else if (data.stream.hasOwnProperty('_id')) {
          game = data.stream.game;
          status = "online";
        };
      })
      .then(() => {
        return fetch(streamURL("channels", channel))
      })
      .then((response) => {
        return response.json();
      })
      .then ((data) => {
        if (data.logo != null) {
          logo = data.logo;
        }
        if (data.display_name != null) {
          name = data.display_name;
        }
        const url = data.url;
        const description = status === "online" ? '' + data.status : "";
        const streamName = data.name;

        const channelElement = document.createElement("div");
        channelElement.className = `channel-element ${status}`
        channelElement.innerHTML = `
          <div class="element-container">
            <div class="streamer-avatar"> <a href="${url}"><img src="${logo}"></a></div>
            <div class="streamer-info">
              <div class="streamer-name"> <a class="stream-link" href="${url}"${name}">${name}</a> </div>
              <div class="streamer-game"> Streaming  <a href="https://www.twitch.tv/directory/game/${game}">${game}</a> </div>
            </div>
            <a class="streamer-title" href="${url}">${description}</a>
            <div class="deleteContainer">
              <svg class="deleteBtn" id="${streamName}" alt="Delete Channel" width="14px" height="18px" viewBox="0 0 14 18" >
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Core" transform="translate(-299.000000, -129.000000)" fill="#706A7C">
                        <g id="delete" transform="translate(299.000000, 129.000000)">
                            <path d="M1,16 C1,17.1 1.9,18 3,18 L11,18 C12.1,18 13,17.1 13,16 L13,4 L1,4 L1,16 L1,16 Z M14,1 L10.5,1 L9.5,0 L4.5,0 L3.5,1 L0,1 L0,3 L14,3 L14,1 L14,1 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
              </svg>
            </div>
          </div>`;

          // Sorts Streams by Online or Offline and adds it to the html.
          const streamContainer = document.querySelector(".stream-container");

          if (status === "online") {
            streamContainer.insertBefore(channelElement, streamContainer.firstChild);
          } else {
            streamContainer.appendChild(channelElement);
          }
      });
      
    });
  });
};


// Function making links work in the extension
function links() {
  const anchors = document.querySelectorAll("a");
  let link = null;

  for (let i = 0; i < anchors.length; i++) {
    anchor = anchors[i];
    anchor.addEventListener('click', function (event)  {
      chrome.tabs.create({
        url: event.target.href
      });
      return false;
    });
  }
};


// EMPTY STATE FUNCTIONS
function checkForEmptyState() {
  chrome.storage.sync.get({
    storedChannels: []
  }, function (data) {
    if (data.storedChannels.length > 0) {
      emptyStateFunc()
    }
  });
}

function emptyStateFunc() {
  document.getElementById("empty-state").remove();
}

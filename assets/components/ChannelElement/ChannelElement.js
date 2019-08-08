// Component functions
// Fetch channel info
// Check if stream is online

const currentDocument = document.currentScript.ownerDocument;

class ChannelElement extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", e => {
      this.clickStream();
    });
  }

  clickStream() {
    console.log("Stream was clicked");
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const template = currentDocument.querySelector("#channel-element-template");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    chrome.storage.sync.get(["storedChannels"], function(data) {
      console.log(data);
      data.storedChannels.map(channel => {
        fetch(streamURL("channels", channel))
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data);
          });
      });
    });
  }
}

customElements.define("channel-element", ChannelElement);

function streamURL(type, id) {
  return (
    "https://api.twitch.tv/kraken/" +
    type +
    "/" +
    id +
    "?client_id=gnvnwcw3bqrjx6gjcydm3fkmbgxmga"
  );
}

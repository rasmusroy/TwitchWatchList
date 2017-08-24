var channelList = ["ESL_CSGO",
"alignftw",
"ESL_SC2",
"ESL_LOL",
"ESL_Overwatch",
"ESL_Heroes",
"ESL_DOTA2",
"wheeze202",
"KingGothalion",
"HeroHarmony"];

// Array of channels stored in localstorage.
localStorage.storedChannels = channelList;
console.log(localStorage.storedChannels);

// Splitting and creating new array of channels.
var channels = localStorage.storedChannels.split(",");
console.log(channels);
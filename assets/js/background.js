// Array of channels stored in localstorage.
localStorage.storedChannels = ["ESL_CSGO",
"alignftw",
"HeroHarmony",
"ESL_SC2",
"ESL_LOL",
"ESL_Overwatch",
"ESL_Heroes",
"ESL_DOTA2",
"wheeze202"];

// Splitting and creating new array of channels.
var channels = localStorage.storedChannels.split(",");
console.log(channels);

// var channels = ["ESL_CSGO",
// "alignftw",
// "HeroHarmony",
// "ESL_SC2",
// "ESL_LOL",
// "ESL_Overwatch",
// "ESL_Heroes",
// "ESL_DOTA2",
// "wheeze202"];
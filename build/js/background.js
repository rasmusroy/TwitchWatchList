// var channels = ["ESL_CSGO",
// "alignftw",
// "ESL_SC2",
// "ESL_LOL",
// "ESL_Overwatch",
// "ESL_Heroes",
// "ESL_DOTA2",
// "wheeze202",
// "KingGothalion",
// "HeroHarmony"];

// chrome.storage.local.set( "channels", ["ESL_CSGO",
// "alignftw",
// "ESL_SC2",
// "ESL_LOL",
// "ESL_Overwatch",
// "ESL_Heroes",
// "ESL_DOTA2",
// "wheeze202",
// "KingGothalion",
// "HeroHarmony"] );


// { "channels" : ["ESL_CSGO",
// "alignftw",
// "ESL_SC2",
// "ESL_LOL",
// "ESL_Overwatch",
// "ESL_Heroes",
// "ESL_DOTA2",
// "wheeze202",
// "KingGothalion",
// "HeroHarmony"] }



// // FUCK YEAH FETCHING 
// function fetchTest() {
//   fetch('https://api.twitch.tv/kraken/channels/esl_sc2?client_id=f1kmn05e2nylo6c3vvcrmt88xxd9g0')
//     .then(function (response) {
//       // Convert to JSON
//       return response.json();
//     })
//     .then(function (j) {
//       // Yay, `j` is a JavaScript object
//       console.log(j);
//     });
// }


// function fetchReal() {
//   channels.forEach(function (channel) {
//     fetch('https://api.twitch.tv/kraken/channels/' + channel + '?client_id=f1kmn05e2nylo6c3vvcrmt88xxd9g0')
//       .then(function (response) {
//         // Convert to JSON
//         return response.json();
//       })
//       .then(function (j) {
//         // Yay, `j` is a JavaScript object
//         console.log(j);
//       });
//   })
// }
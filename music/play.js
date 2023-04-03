const player = require('./player.js');


const play = (query) =>
{
    const url = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

}
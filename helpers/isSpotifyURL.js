const playdl = require('play-dl');

const isSpotifyURL = (query) =>
{
    return playdl.sp_validate(query);
}

module.exports = isSpotifyURL;
const playdl = require('play-dl');

const isYoutubeURL = (query) =>
{
    return playdl.yt_validate(query);
}

module.exports = isYoutubeURL;
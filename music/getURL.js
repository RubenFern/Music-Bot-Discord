const isSpotifyURL = require('../helpers/isSpotifyURL.js');
const isYoutubeURL = require('./../helpers/isYoutubeURL.js');
const spotify = require('./../music/spotify.js');
const youtube = require('./../music/youtube.js');

const getVideo = async (query) =>
{
    let videos = [];

    if ( isYoutubeURL(query) )
        videos = await youtube(query);

    /*else if ( isSpotifyURL(query) )
        videos = await spotify( isSpotifyURL(query) );*/

    return videos;
}

module.exports = getVideo;
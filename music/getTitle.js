const playdl = require('play-dl');

const { API_KEY } = require('../config.json');

const getTitle = async (query) =>
{
    let title = '';
    const type = playdl.yt_validate(query);

    if ( type == 'video' )
    {
        const videoId = query.split("=")[1];

        const api_call = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

        await fetch(api_call)
            .then(res => res.json())
            .then(data => { title = data.items[0].snippet.title; })
            .catch(err => console.error(err));
    }

    if ( type == 'playlist' )
    {
        const playListId = query.split("=")[1];

        const api_call = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playListId}&key=${API_KEY}`;

        await fetch(api_call)
            .then(res => res.json())
            .then(data => { title = data.items[0].snippet.title })
            .catch(err => console.error(err));
    }

    if ( type == 'search' )
    {
        const api_call = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

        await fetch(api_call)
            .then(res => res.json())
            .then(data => { title = data.items[0].snippet.title; })
            .catch(err => console.error(err));
    }

    return title;
}

module.exports = getTitle;
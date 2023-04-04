const playdl = require('play-dl');

const { API_KEY } = require('../config.json');

const youtube = async (query) =>
{
    let videos = [];
    const type = playdl.yt_validate(query);

    if ( type == 'video' )
    {
        const videoId = query.split("=")[1];

        const api_call = `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${videoId}&key=${API_KEY}`;

        await fetch(api_call)
            .then(res => res.json())
            .then(data => 
            {
                const videoTitle = data.items[0].snippet.title;
                const privacy = data.items[0].status.privacyStatus;

                if ( privacy == 'public' )
                    videos.push({ URL: query, Title: videoTitle });
            })
            .catch(err => console.error(err));
    }

    if ( type == 'playlist' )
    {
        const playListId = query.split("=")[1];

        const api_call = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=50&playlistId=${playListId}&key=${API_KEY}`;

        await fetch(api_call)
            .then(res => res.json())
            .then(data =>
            {
                listaVideos = data.items;

                listaVideos.forEach(video =>
                {
                    const url = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
                    const privacy = video.status.privacyStatus;

                    if ( privacy == 'public' )
                        videos.push({ URL: url, Title: video.snippet.title });
                });
            })
            .catch(err => console.error(err));
    }

    if ( type == 'search' )
    {
        const api_call = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet,status&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

        await fetch(api_call)
            .then(res => res.json())
            .then(data => 
            {
                const videoId = data.items[0].id.videoId;
                const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
                const videoTitle = data.items[0].snippet.title;
                const privacy = data.items[0].status.privacyStatus;

                if ( privacy == 'public' )
                    videos.push({ URL: videoURL, Title: videoTitle });
            })
            .catch(err => console.error(err));
    }
console.log(videos)
    return videos;
}

module.exports = youtube;
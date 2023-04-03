const { API_KEY } = require('../config.json');

const getVideo = async (query) =>
{
    const url = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;
    let videoURL = null;
    let videoTitle = null;

    await fetch(url)
        .then(res => res.json())
        .then(data => 
        {
            const videoId = data.items[0].id.videoId;
            videoURL = `https://www.youtube.com/watch?v=${videoId}`;
            videoTitle = data.items[0].snippet.title;
        })
        .catch(err => console.error(err));

    return { videoURL, videoTitle };
}

module.exports = getVideo;
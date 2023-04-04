const { joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const playdl = require('play-dl');

const player = require('./../music/player.js');

let iG = 0;
let voiceChannelG = null;
let videosG = [];

const play = async (voiceChannel, videos) =>
{
    iG = -1;
    voiceChannelG = voiceChannel;
    videosG = videos;

    await playSong(iG, voiceChannel, videos);   
}

const playSong = async (i, voiceChannel, videos) =>
{
    i++;

    if ( i >= videos.length )
        return;

    const video = videos[i];

    // I get audio of content
    const audio = await playdl.stream(video.URL);

    const resource = createAudioResource(audio.stream, { inputType: audio.type, inlineVolume: true });
    resource.volume.setVolume(0.8);

    player.on('error', error => {
        console.error(error);
    });

    player.play(resource);

    // Join in the voice channel
    joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    }).subscribe(player);

    player.on(AudioPlayerStatus.Idle, async () =>
    {
        await playSong(i, voiceChannel, videos);
    });

    updateInfo(i, voiceChannel, videos);
}

const updateInfo = (i, voiceChannel, videos) =>
{
    iG = i;
    voiceChannelG = voiceChannel;
    videosG = videos;
}

const getInfo = () =>
{
    return { iG, voiceChannelG, videosG };
}

module.exports = { play, playSong, getInfo };
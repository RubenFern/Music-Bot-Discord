const { joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const playdl = require('play-dl');

const player = require('./../music/player.js');

const play = async (voiceChannel, videos) =>
{
    await playSong(-1, voiceChannel, videos);   
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

    player.once(AudioPlayerStatus.Idle, async () =>
    {
        await playSong(i, voiceChannel, videos);
    });
}

module.exports = { play, playSong };
const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const playdl = require('play-dl');

let i = 0;

const playerBot = async (interaction, voiceChannel, videos) =>
{
    if ( i >= videos.length )
        return;
    
    const video = videos[i];

    // I get audio of content
    const audio = await playdl.stream(video.URL);

    const resource = createAudioResource(audio.stream, { inputType: audio.type, inlineVolume: true });
    resource.volume.setVolume(0.5);

    const player = createAudioPlayer({
        behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
        },
    });

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


    i++;

    const title = video.Title;
    
    return { player, title};
}

module.exports = playerBot;
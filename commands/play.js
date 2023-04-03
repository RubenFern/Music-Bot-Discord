const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior  } = require('@discordjs/voice');
const playdl = require('play-dl');

const messages = require('./../language/messages.js');
const getURL = require('../music/getURL.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription(messages.playCommandInfo)
        .addStringOption(option => 
            option.setName('query')
            .setDescription(messages.playCommandQueryInfo)
            .setRequired(true)),
	async execute(interaction) 
    {
        const voiceChannel = interaction.member.voice.channel;

        if ( !voiceChannel )
            await interaction.reply(messages.errorPlayCommands);

        const query = interaction.options.getString('query');
        const { videoURL, videoTitle } = await getURL(query);

        // I get audio of content
        const audio = await playdl.stream(videoURL);

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

		await interaction.reply(`Se va a reproducir: ${videoTitle}...`);
	},
};
const { SlashCommandBuilder } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');

const messages = require('./../language/messages.js');
const getURL = require('../music/getURL.js');
const playerBot = require('../music/player.js');

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

        const videos = await getURL(query);

        const { player, title } = await playerBot(interaction, voiceChannel, videos);

        player.on(AudioPlayerStatus.Idle, async () =>
        {
            await playerBot(interaction, voiceChannel, videos);
        });

        await interaction.reply(`Se va a reproducir: ${title}`);
	},
};
const { SlashCommandBuilder } = require('discord.js');

const messages = require('./../language/messages.js');
const { playSong, getInfo } = require('../music/play.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription(messages.nextCommandInfo),
	async execute(interaction) 
    {
        const { iG, voiceChannelG, videosG } = getInfo();

        await playSong(iG, voiceChannelG, videosG);   

        await interaction.reply(`${messages.nextCommand}`);
	},
};
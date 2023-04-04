const { SlashCommandBuilder } = require('discord.js');

const player = require('./../music/player.js');
const messages = require('./../language/messages.js');


module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription(messages.pauseCommandInfo),
	async execute(interaction) 
    {
        player.pause();

        await interaction.reply(`${messages.pauseCommand}`);
	},
};
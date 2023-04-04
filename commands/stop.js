const { SlashCommandBuilder } = require('discord.js');

const player = require('./../music/player.js');
const messages = require('./../language/messages.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription(messages.stopCommandInfo),
	async execute(interaction) 
    {
		player.stop();

		player.removeAllListeners();
		
        await interaction.reply(`${messages.stopCommand}`);
	},
};
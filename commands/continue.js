const { SlashCommandBuilder } = require('discord.js');

const player = require('./../music/player.js');
const messages = require('./../language/messages.js');


module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('continue')
		.setDescription(messages.continueCommandInfo),
	async execute(interaction) 
    {
        player.unpause();

        await interaction.reply(`${messages.continueCommand}`);
	},
};
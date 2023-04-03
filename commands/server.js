const { SlashCommandBuilder } = require('discord.js');
const messages = require('./../language/messages.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription(messages.serverCommandInfo),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`${messages.serverCommand1} ${interaction.guild.name} ${messages.serverCommand2} ${interaction.guild.memberCount} ${messages.serverCommand3}.`);
	},
};
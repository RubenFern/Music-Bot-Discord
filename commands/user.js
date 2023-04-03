const { SlashCommandBuilder } = require('discord.js');
const messages = require('./../language/messages.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription(messages.userCommandInfo),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`${messages.userCommand1} ${interaction.user.username}, ${messages.userCommand2} ${interaction.member.joinedAt}.`);
	},
};
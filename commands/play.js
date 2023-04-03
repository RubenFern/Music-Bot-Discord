const { SlashCommandBuilder } = require('discord.js');
const messages = require('./../language/messages.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription(messages.playCommandInfo)
        .addStringOption(option => 
            option.setName('link')
            .setDescription(messages.playCommandLinkInfo)
            .setRequired(true)),
	async execute(interaction) 
    {
        /**
         * Comando para link y comando para contenidos.
         */
        const link = interaction.options.getString('link');

		await interaction.reply(`Se va a reproducir: ${link}`);
	},
};
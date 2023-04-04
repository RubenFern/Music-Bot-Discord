const { SlashCommandBuilder } = require('discord.js');

const player = require('./../music/player.js');
const messages = require('./../language/messages.js');
const client = require('../server/client.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('continue')
		.setDescription(messages.continueCommandInfo),
	async execute(interaction) 
    {
        player.unpause();

        const mesg = 
        {
            color: parseInt('#0099ff', 16),
            title: `**${messages.continueCommand}**`,
            thumbnail: 
            { 
                url: client.user.displayAvatarURL(),
                height: 30, 
                width: 30 
            }
        };
            
        await interaction.reply({ embeds: [mesg] });
	},
};
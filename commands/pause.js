const { SlashCommandBuilder } = require('discord.js');

const player = require('./../music/player.js');
const messages = require('./../language/messages.js');
const client = require('../server/client.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription(messages.pauseCommandInfo),
	async execute(interaction) 
    {
        player.pause();

        const mesg = 
        {
            color: parseInt('#0099ff', 16),
            title: `**${messages.pauseCommand}**`,
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
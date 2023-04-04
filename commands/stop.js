const { SlashCommandBuilder } = require('discord.js');

const player = require('./../music/player.js');
const messages = require('./../language/messages.js');
const client = require('../server/client.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription(messages.stopCommandInfo),
	async execute(interaction) 
    {
		player.stop();

		player.removeAllListeners();
		
        const mesg = 
        {
            color: parseInt('#0099ff', 16),
            title: `**${messages.stopCommand}**`,
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
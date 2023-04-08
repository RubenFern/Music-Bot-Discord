const { SlashCommandBuilder } = require('discord.js');

const messages = require('./../language/messages.js');
const client = require('../server/client.js');
const player = require('../music/player.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription(messages.nextCommandInfo),
	async execute(interaction) 
    {
        player.stop();

        const mesg = 
        {
            color: parseInt('#0099ff', 16),
            title: `**${messages.nextCommand}**`,
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
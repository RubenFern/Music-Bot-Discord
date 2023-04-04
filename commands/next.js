const { SlashCommandBuilder } = require('discord.js');

const messages = require('./../language/messages.js');
const { playSong, getInfo } = require('../music/play.js');
const client = require('../server/client.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription(messages.nextCommandInfo),
	async execute(interaction) 
    {
        const { iG, voiceChannelG, videosG } = getInfo();

        await playSong(iG, voiceChannelG, videosG);   

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
const { SlashCommandBuilder } = require('discord.js');

const messages = require('./../language/messages.js');
const getURL = require('../music/getURL.js');
const { play } = require('../music/play.js');
const getTitle = require('../music/getTitle.js');
const client = require('../server/client.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription(messages.playCommandInfo)
        .addStringOption(option => 
            option.setName('query')
            .setDescription(messages.playCommandQueryInfo)
            .setRequired(true)),
	async execute(interaction) 
    {
        const voiceChannel = interaction.member.voice.channel;

        if ( !voiceChannel )
            await interaction.reply(messages.errorPlayCommands);

        const query = interaction.options.getString('query');

        // Obtengo el array de videos a ver
        const videos = await getURL(query);

        const title = await getTitle(query);

        // Ejecuto el player para que reproduzca todas las canciones que hayan buscado
        await play(voiceChannel, videos);

        const mesg = 
        {
            color: parseInt('#0099ff', 16),
            title: `Se va a reproducir: \n\n**${title}**`,
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
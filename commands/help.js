const { SlashCommandBuilder } = require('discord.js');

const messages = require('./../language/messages.js');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(messages.helpCommandInfo),
	async execute(interaction) 
  {
    const user = interaction.user;
    const mesg = 
    {
      color: parseInt('#0099ff', 16),
      title: 'Lista de comandos',
      description: `
        :musical_note: **/play**: ${messages.helpPlay}

        :stop_button: **/stop**: ${messages.helpStop}

        :fast_forward: **/next**: ${messages.helpNext}

        :pause_button: **/pause**: ${messages.helpPause}
        
        :arrow_forward: **/continue**: ${messages.helpContinue}
      `,
      thumbnail: 
      { 
        url: user.avatarURL(),
        height: 30, 
        width: 30 
      }
    };
		
     await interaction.reply({ embeds: [mesg] });
	},
};
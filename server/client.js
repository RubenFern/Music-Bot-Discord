const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client(
    { 
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildVoiceStates
        ] 
    });

module.exports = client;
const client = require("../server/client");


client.on('voiceStateUpdate', (oldState, newState) => 
{
    // verifica si el bot está en el canal de voz
    const botVoiceConnection = newState.guild.voice?.connection;

    if (botVoiceConnection) 
    {
        // verifica si no hay nadie más en el canal de voz
        const membersInChannel = newState.channel?.members;
        
        if (membersInChannel && membersInChannel.size === 1 && membersInChannel.first().id === client.user.id) 
        {
            // si el bot es el único en el canal de voz, desconéctalo después de 10 minutos de inactividad
            setTimeout(() => 
            {
                if (botVoiceConnection && membersInChannel.size === 1 && membersInChannel.first().id === client.user.id) {
                    botVoiceConnection.disconnect();
            }
            }, 10 * 60 * 1000); // 10 minutos en milisegundos
        }
        else
        {
            const voiceChannel = newState.channel;

            setInterval(() => {
                voiceChannel.guild.voiceStates.cache.get(client.user.id).setActivity();
            }, 300000); // 5 minutos en milisegundos
        }
    }
});
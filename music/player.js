const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

const player = createAudioPlayer({
    behaviors: {
    noSubscriber: NoSubscriberBehavior.Play,
    },
});

module.exports = player;
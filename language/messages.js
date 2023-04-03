const config = require('./../language/language.json');
const messagesFile = require('./../language/messages.json');

// I get the language of the user
const userLocale = config.language || 'en';

// I get the locale messages
const messages = messagesFile[userLocale];

module.exports = messages;
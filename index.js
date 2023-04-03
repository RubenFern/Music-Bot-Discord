const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits  } = require('discord.js');

const { token } = require('./config.json');
const loadEvents = require('./server/loadEvents.js');
const deployCommands = require('./server/deployCommands.js');
const loadCommands = require('./server/loadCommands.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Deploy commands
deployCommands(fs, path);

// Load commands
loadCommands(client, fs, path);

// Load events
loadEvents(client, fs, path);

// Log in to Discord with your client's token
client.login(token);
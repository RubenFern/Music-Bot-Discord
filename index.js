require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const loadEvents = require('./server/loadEvents.js');
const deployCommands = require('./server/deployCommands.js');
const loadCommands = require('./server/loadCommands.js');
const client = require('./server/client');

// Deploy commands
deployCommands(fs, path);

// Load commands
loadCommands(client, fs, path);

// Load events
loadEvents(client, fs, path);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

let logger;

client.on('ready', () => {
	logger(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ activity: { name: 'jouw huiswerk', type: 'WATCHING' }, status: 'online' });
});

function start(token, log) {
	logger = log;
	client.login(token);
}

function stop() {
	client.user.setPresence({ activity: { name: 'met nieuwe updates', type: 'PLAYING' }, status: 'dnd' });
}

function terminate() {
	client.destroy();
}

module.exports = {
	start: start,
	stop: stop,
	terminate: terminate
}
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

/**
	logger(str): console.log(`[DISCORD]: ${str}`);
	config: JSON.parse(fs.readFileSync(`${$workingDir}/../config.json`));
	db: {
		read(part, reason): (example: db.read('admins[0].name', `${user} had de naam nodig`))
		write(part, value, reason): (example: db.write('admins[1].email', 'joost@gmail.com', 'Hij heeft een andere email'))
	}
	workingDir: './app/'
**/
let logger, config, db, workingDir;

client.on('ready', () => {
	logger(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ activity: { name: 'jouw huiswerk', type: 'WATCHING' }, status: 'online' });
});

client.on('message', (msg) => {
	if(msg.author.bot) return;
	if(!msg.guild) return;

	if(msg.content.startsWith(config.prefix)) {
		let command = msg.content.substring(config.prefix.length, msg.content.indexOf(' ') !== -1 ? msg.content.indexOf(' ') : msg.content.length);
		let args = msg.content.indexOf(' ') !== -1 ? msg.content.substring(config.prefix.length + command.length + 1).split(' ') : [];

		logger(msg.author.tag + ': ' + msg.content);
		msg.channel.send(msg.author.tag + ': ' + msg.content);
	}
});


function createchannel(channel) {
	
	const fetchedchannel = client.channels.find("name",channel)
	fetchedchannel.delete();
	
}

function start(token, args) {
	logger = args.logger;
	config = args.config;
	db = args.db;
	workingDir = args.dir;
	
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

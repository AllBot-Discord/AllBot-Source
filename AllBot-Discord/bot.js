const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const config = require("./config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INTEGRATIONS] });


const prefix = config.prefix;
const token = config.token;

const ownGuildID = '880997407440130068';
const botID = '880995302893563964';
const roleAdmin = '881020645868195880';
const roleMembro = '881020707818070096';

//=================================================//
//  BY: PINGUIN.ZIP  ││  Discord: d.gg/w7rHTk92Wm  //
//  DATE: 28/08/21   ││  Version: 1.2              //
//=================================================//

const fs = require('fs');
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("No Commands Find");
      return;
    }
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);//Choose your Commands folder//
        // console.log(`${f} - Loaded`);
        client.commands.set(props.help.name, props);
        client.commands.set(props.help.alias, props);
    });
    console.log(`CMD Loaded: ${jsfile.length}.`);
});

//Export Event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.login(token);
const Discord = require("discord.js");

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {

    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {
           msg.reply("Carregando...").then(async (result) => {
            const ping = await result.createdTimestamp - msg.createdTimestamp;
               setTimeout(() => {
                result.edit(">>> **Carregando.**");
                setTimeout(() => {
                    result.edit(">>> **Carregando..**");
                    setTimeout(() => {
                        result.edit(">>> **Carregando...**");
                        setTimeout(() => {
                            result.edit(`>>> Latência do **Bot: ${ping}ms**\nLatência da **API: ${client.ws.ping}ms**`);
                        }, 1000);
                    }, 1000);
                }, 1000);
               }, 1000);
           }).catch((err) => {
               
           });
       }
    else
    {
        msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }
}

module.exports.help = {
    name: 'ping',
    alias: 'pong',
	description: 'Comando de Ping (Membro)'
};
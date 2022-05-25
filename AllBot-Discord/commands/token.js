const Discord = require("discord.js");
const poolSql = require('../config/db/token');

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {
    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {
           //create a random alphanumeric string
            // //   var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await poolSql.ChkToken(msg.author.id).then((result) => {
                console.log(result);
            }).catch((err) => { console.error(err); });
       }
        else
        {
            msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
        }

}

module.exports.help = {
    name: 'token',
    alias: 'tokengen',
	description: 'Gera TOKEN (senha para acessar o Site)'
};
const Discord = require("discord.js");

const poolSql = require('../config/db/newMember');

module.exports.run = async (msg, args, client, roleAdmin) => {

    if(msg.guild.roles.cache.find(role => role.id == roleAdmin))
       {

            var autorid = args[1];
            var usuario = client.users.cache.find(user => user.id === autorid);
            var ususarioMembro = await msg.guild.members.cache.get(args[1]);
            var userUrl = usuario.displayAvatarURL().slice(54).replace('.webp','').replace('.gif','');

            var sqlcmd = `SELECT COUNT(*) AS 'value' FROM usuarios WHERE discordid='${autorid}'`;

            const sqlCad = "INSERT INTO `allbot`.`usuarios`(`discordid`, `discordtag`, `discordprofile`, `balance`, `febcoin`)"
                    + `VALUES ('${autorid}', '${ususarioMembro.user.tag}', '${userUrl}', '100.00', '0.0025');`;

            poolSql.cadUser(sqlcmd, sqlCad);
       }
    else
    {
        msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }

    msg.delete();

}

module.exports.help = {
    name: 'cadme',
    alias: 'caduser',
	description: 'Cadastra um Membro (BD)'
};
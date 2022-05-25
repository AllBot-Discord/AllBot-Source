const Discord = require("discord.js");

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {

    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {
           var autorid = msg.author.id;

           var usuario = client.users.cache.find(user => user.id === autorid)

           var userUrl = usuario.displayAvatarURL().slice(54).replace('.webp','').replace('.gif','');

           console.log(userUrl);

        // console.log(usuario.displayAvatarURL());
       }
    else
    {
        msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }

    msg.delete();

}

module.exports.help = {
    name: 'profileinfo',
    alias: 'pinfo',
	description: 'Profile User Info (Membro)'
};
module.exports = {
	name: 'guildMemberAdd',
	execute(client, member) {

		const { MessageEmbed } = require("discord.js");
		const chnId = '883934811113271387';
        const roleMembro = "881020707818070096";
		const chnObj = member.guild.channels.cache.find(channel => channel.id == '883934811113271387');
        const poolSql = require('../config/db/newMember.js');

        var autorid = member.id;
        var usuario = client.users.cache.find(user => user.id === autorid)
        var userUrl = usuario.displayAvatarURL().slice(54).replace('.webp','').replace('.gif','');

		const newMember = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('> Seja bem-vindo(a)!')
        .setDescription(`**${member.user.tag}**`)
        .setThumbnail(usuario.displayAvatarURL())
        .setTimestamp()
        .setFooter(`ID: ${member.id}`, 'https://i.imgur.com/AfFp7pu.png');
        
		chnObj.send({ embeds: [newMember] });

        member.roles.add(roleMembro).catch(console.error);

        // ------------ MYSQL

        var sqlcmd = `SELECT COUNT(*) AS 'value' FROM usuarios WHERE discordid='${autorid}'`;

        const sqlCad = "INSERT INTO `allbot`.`usuarios`(`discordid`, `discordtag`, `discordprofile`, `balance`, `febcoin`)"
                    + `VALUES ('${autorid}', '${member.user.tag}', '${userUrl}', '100.00', '0.0025');`;

            poolSql.cadUser(sqlcmd, sqlCad);

	},
};
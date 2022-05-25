const Discord = require("discord.js");

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {
    if(msg.guild.roles.cache.find(role => role.id == roleAdmin))
       {
        try
        {
        const messageArray = msg.content.split(' ');
        const args = messageArray.slice(1);
        let deleteAmount;

        msg.delete();
       
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply({content:'Insira Somente Números!'}) }
        {
        deleteAmount = parseInt(args[0]);
        msg.channel.bulkDelete(deleteAmount, true).then(messages => { console.log(`CMD: 'clear' Membro: '${msg.author.id}' Total: ${messages.size}`)
        msg.channel.send({content:`${messages.size} Mensagens Apagadas`}).then(msgenv => { setTimeout(() => msgenv.delete(), 2000); })//msgenv.delete({timeout: 3000})
        }).catch(console.error);
        }
        }catch(err)
        {
            
            console.log("ERROR - LIMPAR MENSAGENS -- "+err)
        }
       }
    else
    {
        msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }

}

module.exports.help = {
    name: 'clear',
    alias: 'limpar',
	description: 'Limpar Mensagens (Admin)'
};
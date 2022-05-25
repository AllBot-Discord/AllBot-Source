const Discord = require("discord.js");

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {
    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {
           var cmdDescrp = '';
        try
        {
            const fs = require('fs');
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("No Commands Find");
      return;
    }
    jsfile.forEach((f, i) =>{
        let props = require(`../commands/${f}`);
        cmdDescrp += `===============\nComando: **${props.help.name}** - Alias:** ${props.help.alias}**\nDescrição: **${props.help.description}**\n`;
        
    });
    // console.log(`Cmd Loaded: ${jsfile.length}.`);
    msg.channel.send(`>>> Quantidade de Comandos: **${jsfile.length}**\n${cmdDescrp}`);
});
            
            msg.delete();

        }catch(err)
        {
            
            console.log("ERROR - LISTAR CMDS -- "+err)
        }
       }
    else
    {
        msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }

}

module.exports.help = {
    name: 'ajuda',
    alias: 'help',
	description: 'Lista Todos os Comandos.'
};
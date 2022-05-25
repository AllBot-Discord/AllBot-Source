const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {

    //BASE URL: https://api.stackexchange.com/2.3/

    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {
        var valido = true;

           if(msg.content === "!sof " || msg.content === "!sof")
           {
               valido = false;
           }

        var dados;
        var valueSearch;
        const regexUrl = /&nbsp/g;

        switch (args[1]) {
            case '':
                valido = false;
                break;

            case '=titulo'://IGUAL TITULO
                



                break;//=titulo-fim
//---------------------------------------------------------//
                case '*titulo'://PARECIDO TITULO
                
                valueSearch = msg.content.replace('!stackoverflow *titulo', '');
                valueSearch = valueSearch.replace('!sof *titulo', '');

                valueSearch = valueSearch.replace(regexUrl, '%');

                dados = pesquisaStack(valueSearch);


                break;//*titulo-fim
//---------------------------------------------------------//
                case '=tags'://IGUAL TAGS
                



                break;//=tags-fim

//---------------------------------------------------------//

            default:
                msg.reply({content: "Comando Inválido."});
                valido = false;
                break;
        }

        if(valido == true)
        {

        async function pesquisaStack(valSearch)
        {
            return await axios.get(`https://api.stackexchange.com/2.3/search?page=1&pagesize=3&order=desc&min=1&sort=votes&intitle=${valSearch}&site=stackoverflow`);
        }

        dados.then(function(resposta)
        {
            const regexSpace = /,/g;
            var tags = resposta.data.items[0].tags.toString();

            tags = tags.replace(regexSpace, " | ");//" | "

        const stackoverflow = new MessageEmbed()
	.setColor('#F48024')
	.setTitle(`${resposta.data.items[0].title}`)
	.setURL(resposta.data.items[0].link)
	// .setDescription('DESCRIÇÃO')
    .setAuthor(`Autor: ${resposta.data.items[0].owner.display_name}`, `${resposta.data.items[0].owner.profile_image}`, `${resposta.data.items[0].owner.link}`)
	.setThumbnail('https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png')
	.addFields(
		{ name: 'Tags:', value: `${tags}`, inline: true },
		{ name: 'Upvotes:', value: `${resposta.data.items[0].score}`, inline: true },
        { name: 'Qtd. Visualização:', value: `${resposta.data.items[0].view_count}`, inline: true },
        { name: 'Search/Pesquisa:', value: `${valueSearch}`, inline: true },
	)
	.setTimestamp()
	.setFooter('AllBot / 4º Semestre PI', 'https://i.imgur.com/AfFp7pu.png');

        msg.channel.send({ embeds: [stackoverflow] });

        });
        }//VALIDO TRUE   
        else
        {

        }    
    }
    else
    {
        // msg.channel.send(`:point_right: ${msg.author}, No Permission.`);
    }

    setTimeout(() => msg.delete(), 2000);

}

module.exports.help = {
    name: 'stackoverflow',
    alias: 'sof',
	description: 'Pesquisa no Site: StackOverFlow (Membro)'
};
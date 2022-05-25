// const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");
var moment = require('moment');

const subcmd = ['?','minerar','loja','transferir','receber','corretora','bolsa'];

module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {

    console.log(args);

    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {

        if(msg.content == "!febcoin" || msg.content == "!febcoin " || msg.content == "!crypto" || msg.content == "!crypto ")
        {
            // msg.channel.send
        }

        switch (args[1]) {
            case '?':
    
            const helpCrypt = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Sub Comandos (FebCoin)')
        .setDescription('Sub-Comandos: '+subcmd)
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        msg.channel.send({ embeds: [helpCrypt] });

        // msg.delete();
                break;

                case 'minerar':
                    minerar(msg);
                    break;


            default:
                msg.channel.send({ content: "Você NÃO escolheu um sub-comando" })
                .then(msgNoSubCmd => {
                    setTimeout(() => msgNoSubCmd.delete(), 3000);
                }).catch(error => {
                });
                break;
        }

       }//IF-PERMISSION
    else
    {
        msg.channel.send({ content: `:point_right: ${msg.author}, No Permission.`});
    }

    setTimeout(() => msg.delete(), 2000);

}

async function minerar(msg)
{
    msg.channel.send({ content:'Iniciando a Mineração... Favor aguarde...'})
    .then(waitstartmsg => {
        setTimeout(() => waitstartmsg.delete(), 10000);
    }).catch(err => {
        console.error(err);
    });

    // // VARIAVEIS // //

    var timeNowMoment = moment().format('DD/MM/YYYY hh:mm:ss');
    var nowUnix = moment().unix().toString();

    var bufferText = Buffer.from(`febcoin-${msg.author.id}-${nowUnix}`, 'utf8').toString('hex');

    // -------------- //

    // .then(value => {
    // }).catch(error => {
    // });

// ------------------------------------------------------------------------------ //

    //const prefixHex = 'febcoin-'
 // console.log(bufferText);
    
    const minerarStart = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Iniciando a Mineração...')
    .setDescription(`
Usuário: **${msg.author.tag}**, Começou a Minerar na rede da **Febcoin**.`)
.addFields(
    { name: 'HASH', value: bufferText.toString(), inline: false },
    { name: 'Data&Hora:', value: timeNowMoment.toString(), inline: true },
    { name: 'UNIX:', value: nowUnix, inline: true },
    { name: 'Poder de Mineração:', value: '0/5.000', inline: true },
)
    .setThumbnail('https://media.discordapp.net/attachments/883167085566525440/883167275966943242/unknown.png?width=543&height=498')
    .setTimestamp()
    .setFooter(`Equipe: 4º PI`, 'https://media.discordapp.net/attachments/883167085566525440/883169605579853934/AllBot_Logo.png?width=498&height=498');

    msg.channel.send({ embeds: [minerarStart] })
    .then(msgEmbedStart => {
        
        // let embedStartEdit = new MessageEmbed()
        minerarStart.setTitle('[ Mineração Iniciada ]')

        setTimeout(() => msgEmbedStart.edit({embeds: [minerarStart]}), 2000);
        // ----------------------


        }).catch(error => {
            console.error(error);
        });




    return console.log(`Mineração Iniciada - ${msg.author.tag}`);
}



module.exports.help = {
    name: 'febcoin',
    alias: 'fc',
	description: 'Crypto Coin [FebCoin]'
};
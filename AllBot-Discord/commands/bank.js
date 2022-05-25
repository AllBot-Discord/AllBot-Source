const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { time } = require("discord.js/src/util/Formatters.js");
const poolSql = require('../config/db/banco.js');

const subcmd = ['?','conta','pix', 'febcoin','~~extra~~'];


module.exports.run = async (msg, args, client, roleAdmin, roleMembro) => {

    const emojiPix = client.emojis.cache.get('892259647375949825');
    const emojiCoin = client.emojis.cache.get('892602426257973309');
    const emojiLista = client.emojis.cache.get('895122428408238131');

    const emojiCarteira = client.emojis.cache.get('885733404774129704');
    
    const emojiEnviar = client.emojis.cache.get('892948857195991130');
    const emojiReceber = client.emojis.cache.get('892951741916659762');

    if(msg.guild.roles.cache.find(role => role.id == roleMembro))
       {
           switch (args[1]) {
               case '?':
                const helpBank = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Sub Comandos (Sistema Bancário)')
                .setDescription('Sub-Comandos: **'+subcmd+'**')
                .setThumbnail('https://i.imgur.com/oQj5iJ8.png')

                msg.channel.send({ embeds: [helpBank]});
                   break;

                        //---------------------------------------------//

            case 'conta':

                var chaveFC = await cryptWallet(msg.author.id);

                const embedConfirmPix = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('[ PIX ]')
                .addFields(
                    { name: 'Sua Chave PIX', value: '>>> '+msg.author.id, inline: true },
                    { name: 'Para enviar PIX, use o comando:', value: '>>> !banco pix (CONTA) VALOR', inline: false },
                    { name: 'OBS.:', value: 'Valor minímo de Transferencia: 1.01R$', inline: true },
                )
                .setThumbnail('https://i.imgur.com/ro0KjuP.png')
                .setTimestamp()
                .setFooter(`PIX`, 'https://i.imgur.com/AfFp7pu.png');

                const embedConfirmFC = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('[ FebCoin ]')
                .addFields(
                    { name: 'Sua Chave F.C.', value: '>>> '+chaveFC, inline: true },
                    { name: 'Para enviar FebCoin, use o comando:', value: '>>> !banco febcoin (CONTA) VALOR', inline: false },
                    { name: 'OBS.:', value: 'Valor minímo de Transferencia: 0.001', inline: true },
                )
                .setThumbnail('https://i.imgur.com/eE3UE6X.png')
                .setTimestamp()
                .setFooter(`FEBCOIN`, 'https://i.imgur.com/AfFp7pu.png');
            
                // var sqlcmdExibir = "SELECT balance AS 'moeda', febcoin AS 'febcoin' FROM usuarios WHERE discordid="+`'${msg.author.id}';`;
                var sqlcmdExibir = "SELECT balance, febcoin, discordid FROM allbot.usuarios WHERE discordid="+`'${msg.author.id}';`;
                var sqlcmdTransf = "SELECT COUNT(*) AS 'value' FROM allbot.transferencias WHERE de="+`'${msg.author.id}';`;

                sqlConta();

                async function sqlConta()
                {
                    var carteira = ['', ''];
                    var taxas = ['', ''];
                    var transferencias;

                    await poolSql.exibirConta(sqlcmdExibir).then((result) => {
                        carteira[0] = result[0];
                        carteira[1] = result[1];
                    }).catch((err) => {
                        console.error(err);
                    });

                    await poolSql.exibirTaxas().then((result) => {
                        taxas[0] = result[0];
                        taxas[1] = result[1];
                    }).catch((err) => {
                        console.error(err);
                    });

                    await poolSql.exibirTransferencias(sqlcmdTransf).then((result) => {
                        transferencias = result;
                        if (transferencias[0] == 'null' || transferencias[0] === null || transferencias[0] == undefined || transferencias[0] === nullundefined)
                        {
                            transferencias[0] = "0";
                            transferencias[1] = "0";
                        }
                    }).catch((err) => {
                        console.error(err);
                    });
    
                    const embedConta = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('[ Conta Bancária ]')
                    .setDescription(`Usuário: <@${msg.author.id}>`)
                    .addFields(
                        { name: 'R$', value: carteira[0], inline: true },
                        { name: 'FebCoin', value: carteira[1], inline: true },
                        { name: 'Transferencias', value: 'PIX: '+transferencias[0]+'  //  F.C.: '+transferencias[1], inline: true },
                        { name: 'Enviar PIX', value: `Reagir com: ${emojiPix}`, inline: false },
                        { name: 'Enviar FebCoin', value: `Reagir com: ${emojiCoin}`, inline: false },
                        { name: 'Listar Transferencias', value: `Reagir com: ${emojiLista}`, inline: false },
                    )
                    .setThumbnail('https://i.imgur.com/oQj5iJ8.png')
                    .setTimestamp()
    


                    msg.channel.send({ embeds: [embedConta]}).then((msgConta) => {
                        msgConta.react(emojiPix);
                        msgConta.react(emojiCoin);
                        msgConta.react(emojiLista);


                        const filter = (reaction, user) => {
                            return (reaction.emoji.name == '_pix' || reaction.emoji.name == '_coin' || reaction.emoji.name == '_lista') && user.id === msg.author.id;
                        };

                          const collector = msgConta.createReactionCollector({ filter, max: 1, time: 10000 });

                        collector.on('collect', (reaction, user) => {
                            // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                            msgConta.reactions.removeAll()
                            .catch(error => console.error('Failed to clear reactions:', error));
                            
                            if (reaction.emoji.name === '_pix' && user != msgConta.author.id)//ENVIAR
                            {
                                // console.log('Reagiu Pix');
                                msgConta.edit({ embeds: [embedConfirmPix]});
                                msgConta.react(emojiEnviar);
                            }
                            else if (reaction.emoji.name === '_coin' && user != msgConta.author.id)//ENVIAR
                            {
                                // console.log('Reagiu FebCoin');
                                msgConta.edit({ embeds: [embedConfirmFC]});
                                msgConta.react(emojiEnviar);
                            }
                            else if (reaction.emoji.name === '_lista' && user != msgConta.author.id)//ENVIAR
                            {
                                // console.log('Reagiu Listar Transferencias');

                                const embedListTransactions = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('[ Transferencias (PIX e FEBCOIN) ]')
                                .setDescription(``)
                                .setThumbnail('https://i.imgur.com/eE3UE6X.png')
                                .setTimestamp()
                                .setFooter(`Transferencias`, 'https://i.imgur.com/AfFp7pu.png');

                                msgConta.edit({ embeds: [embedListTransactions]});
                                msgConta.react(emojiLista);
                            }

                        });//COLLECTOR - COLLECTED END
                        
                        collector.on('end', collected => {
                            // console.log(`Collected ${collected.size} items`);
                            
                        });

                    }).catch((err) => {
                        
                    });

                }
                break;

                        //-------------------------------------------------//

                case 'pix':

                    var reciverPix = msg.guild.members.cache.get(args[2]);
                    var valorArgs = parseFloat(args[3]);

                    if(reciverPix == undefined || reciverPix === undefined)
                    {
                        //MEMBRO INVÁLIDO
                        // console.log(`${reciverPix} ID INVÁLIDO OU FORA DO SERVIDOR`);
                        const embedInvalidUser = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('>>> **CARTEIRA INVÁLIDA**')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedInvalidUser] }).then((result) => {
                            setTimeout(() => {
                                result.delete();
                            }, 5000);
                        }).catch((err) => {
                        });

                    }
                    else    //MEMBRO VÁLIDO --------OK
                    {
                        if(valorArgs === '' || valorArgs == '' || valorArgs == undefined || valorArgs === undefined || isNaN(valorArgs) || valorArgs <= 1.01)
                        {
                            //VALOR INVÁLIDO
                            // console.log(`${valorArgs} INVÁLIDO OU INFERIOR A 2 R$`);
                            const embedInvalidValor = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('>>> **VALOR INVÁLIDO OU INFERIOR A TAXA**')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedInvalidValor] }).then((result) => {
                            setTimeout(() => {
                                result.delete();
                            }, 5000);
                        }).catch((err) => { 
                        });                

                        }
                        else //VALOR VALIDO
                        {
     
        var taxaAtual;
        await poolSql.exibirTaxas().then((result) => {
            taxaAtual = result[0];
            // console.log(taxaAtual);
        }).catch((err) => {
            console.error(err);
        });

            var valorFinal = valorArgs - taxaAtual;
            var valorComTaxa = valorArgs;

            var sqlQtdValidar = "SELECT balance as 'pixqtd', febcoin as 'coinqtd' FROM allbot.usuarios WHERE "+`(discordid = '${msg.author.id}');`;

        var qtdContaBanco;
        await poolSql.exibirQtdConta(sqlQtdValidar).then((result) => {
            // console.log(`SQL: ${sqlQtdValidar}\n${result}`);
            qtdContaBanco = result[0];
        }).catch((err) => {
            console.error(err);
        });
        
        // console.log(`Valor a Enviar: ${valorComTaxa} -- Valor Total da Conta: ${qtdContaBanco}`);

        if (parseFloat(valorComTaxa) > parseFloat(qtdContaBanco))
         {
            const embedContaBaixa = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('>>> **VALOR DADO É INFERIOR A SUA CONTA**')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedContaBaixa] })
         }
         else
         {
            var sqlEnviaPixA = "UPDATE allbot.usuarios SET `balance` = `balance` +"+`${parseFloat(valorFinal)}`+" WHERE (discordid = " + `'${reciverPix.id}');`;
            var sqlEnviaPixB = "UPDATE allbot.usuarios SET `balance` = `balance` -"+`${valorArgs}`+" WHERE (discordid = " + `'${msg.author.id}');`;
            var sqlEnviaPixC = "UPDATE allbot.usuarios SET `balance` = `balance` +"+`${taxaAtual}`+" WHERE (discordid = '880995302893563964');";

        await poolSql.enviarPix(sqlEnviaPixA, sqlEnviaPixB, sqlEnviaPixC).then((result) => {

            const embedValidPix = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('[ PIX ]')
                    .setDescription(`>>> O usuário: **${msg.author.tag}**\nEnviou um PIX de: **${valorArgs}R$**\nPara o usuário: **${reciverPix.user.tag}**`)
                    .setFooter(`Valor da Taxa Atual: ${taxaAtual}R$`, 'https://i.imgur.com/ro0KjuP.png')
                    .setThumbnail('https://i.imgur.com/ro0KjuP.png')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedValidPix] });

        }).catch((err) => {
            console.error(err);
        });
                            }//VALIDAR SALDO
                        }//VALIDOR VALOR INSERIDO
                    }//VALIDAR USUARIO (RECEBEDOR)
            
                    //BREAK-PIX
                break;

                        //-------------------------------------------------//

                case 'febcoin':
                    
                    // var reciverFc = msg.guild.members.cache.get(args[2]);

                    var reciverFebcoin = args[2];

                    if(reciverFebcoin == undefined ||
                         reciverFebcoin === undefined ||
                          reciverFebcoin == '' ||
                           reciverFebcoin === '' ||
                            reciverFebcoin.length < 16)
                    {
                        //MEMBRO INVÁLIDO
                        // console.log(`${reciverPix} ID INVÁLIDO OU FORA DO SERVIDOR`);
                        const embedInvalidUser = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('>>> **CARTEIRA INVÁLIDA**')
                    .setTimestamp()

                        return msg.channel.send({ embeds: [embedInvalidUser] });
                    }

                    // // if(args[2] == undefined || args[2] == '')
                    // // {
                    // //     return msg.reply('>>> **USUÁRIO INVÁLIDO**');
                    // // }

                    var reciverFcFunction = await decryptWallet(args[2]);
                    var reciverFc = await msg.guild.members.cache.get(reciverFcFunction);
                    var valorArgs = parseFloat(args[3]);

                    if(reciverFc == undefined || reciverFc === undefined)
                    {
                        //MEMBRO INVÁLIDO
                        // console.log(`${reciverFc} ID INVÁLIDO OU FORA DO SERVIDOR`);
                        const embedInvalidUser = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('>>> **ID INVÁLIDO OU MEMBRO FORA DO SERVIDOR**')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedInvalidUser] }).then((result) => {
                            setTimeout(() => {
                                result.delete();
                            }, 5000);
                        }).catch((err) => {
                        });

                    }
                    else    //MEMBRO VÁLIDO --------OK
                    {
                        if(valorArgs === '' || valorArgs == '' || valorArgs == undefined || valorArgs === undefined || isNaN(valorArgs) || valorArgs <= 0.0009)
                        {
                            //VALOR INVÁLIDO
                            // console.log(`${valorArgs} INVÁLIDO OU INFERIOR A 0.001`);
                            const embedInvalidValor = new MessageEmbed()
                            .setColor('#0099ff')
                            .setDescription('>>> **VALOR INVÁLIDO OU INFERIOR A TAXA**')
                            .setTimestamp()

                            msg.channel.send({ embeds: [embedInvalidValor] }).then((result) => {
                                setTimeout(() => {
                                    result.delete();
                                }, 5000);
                            }).catch((err) => { 
                            });                

                        }
                        else //VALOR VALIDO
                        {

        var taxaAtual;
        await poolSql.exibirTaxas().then((result) => {
            taxaAtual = result[1];
        }).catch((err) => {
            console.error(err);
        });

            var valorFinal = valorArgs - taxaAtual;
            var valorComTaxa = valorArgs;


        var sqlQtdValidar = "SELECT balance as 'pixqtd', febcoin as 'coinqtd' FROM allbot.usuarios WHERE "+`(discordid = '${msg.author.id}');`;

        var qtdContaBanco;
        await poolSql.exibirQtdConta(sqlQtdValidar).then((result) => {
            // console.log(`SQL: ${sqlQtdValidar}\n${result}`);
            qtdContaBanco = result[1];
        }).catch((err) => {
            console.error(err);
        });
        
        if (parseFloat(valorComTaxa) > parseFloat(qtdContaBanco))
         {
            //FALTA DINHEIRO NA CONTA
            const embedContaBaixa = new MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('>>> **VALOR DADO É INFERIOR A SUA CONTA**')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedContaBaixa] }).then((result) => {
                            setTimeout(() => {
                                result.delete();
                            }, 5000);
                        }).catch((err) => { 
                        });   
                        //#endregion VALIDAR VALOR DA CONTA - END
         }
        else
        {
            var sqlEnviaFebcoinA = "UPDATE allbot.usuarios SET `febcoin` = `febcoin` +"+`${valorFinal}`+" WHERE (discordid = " + `'${reciverFc.id}');`;
            var sqlEnviaFebcoinB = "UPDATE allbot.usuarios SET `febcoin` = `febcoin` -"+`${valorArgs}`+" WHERE (discordid = " + `'${msg.author.id}');`;
            var sqlEnviaFebcoinC = "UPDATE allbot.usuarios SET `febcoin` = `febcoin` +"+`${taxaAtual}`+" WHERE (discordid = '880995302893563964');";

        await poolSql.enviarFebcoin(sqlEnviaFebcoinA, sqlEnviaFebcoinB, sqlEnviaFebcoinC).then((result) => {

            //WORKED

            const embedValidFc = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('[ FebCoin ]')
                    .setDescription(`>>> O usuário: **${msg.author.tag}**\nEnviou FebCoin de: **${valorArgs} F.C.**\nPara o usuário: **${reciverFc.user.tag}**`)
                    .setFooter(`Valor da Taxa Atual: ${taxaAtual}F.C.`, 'https://i.imgur.com/eE3UE6X.png')
                    .setThumbnail('https://i.imgur.com/eE3UE6X.png')
                    .setTimestamp()

                        msg.channel.send({ embeds: [embedValidFc] });



                        //CAD. TRANSFERENCIA
                        // tipoMoeda, deUser, paraUser, valorTransferido, hexUserId
                        cadTransferencia(args[1], msg.author.id, reciverFc.id, valorFinal, msg.author.id).then((result) => {
                            

                        }).catch((err) => {
                            console.error(err);
                        });

                        


        }).catch((err) => {
            console.error(err);
        });
                            }
                        }
                    }
            

                    //BREAK-FC
                break;
                        
                        //-------------------------------------------------//
                        
                        case 'mod':

                            var carteiraModDecrypt = await decryptWallet(args[2]);
                            var carteiraModCrypt = await cryptWallet(args[2]);

                            var sqlcmdExibir = "SELECT balance, febcoin, discordid FROM allbot.usuarios WHERE discordid="+`'${args[2]}';`;
                            var sqlcmdTransf = "SELECT COUNT(*) AS 'value' FROM allbot.transferencias WHERE de="+`'${args[2]}';`;
            
                            sqlContaMod();
            
                            async function sqlContaMod()
                            {
                                var carteira = ['', ''];
                                var taxas = ['', ''];
                                var transferencias;
            
                                await poolSql.exibirConta(sqlcmdExibir).then((result) => {
                                    carteira[0] = result[0];
                                    carteira[1] = result[1];
                                }).catch((err) => {
                                    console.error(err);
                                });
            
                                await poolSql.exibirTaxas().then((result) => {
                                    taxas[0] = result[0];
                                    taxas[1] = result[1];
                                }).catch((err) => {
                                    console.error(err);
                                });
            
                                await poolSql.exibirTransferencias(sqlcmdTransf).then((result) => {
                                    transferencias = result;
                                    if (transferencias[0] == 'null')
                                    {
                                        transferencias[0] = "0";
                                        transferencias[1] = "0";
                                    }
                                    else if (transferencias[0] == undefined)
                                    {
                                        transferencias[0] = "0";
                                        transferencias[1] = "0";
                                    }
                                }).catch((err) => {
                                    console.error(err);
                                });

                                const embedConta = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('[ Conta Bancária ]')
                                .setDescription(`Usuário: <@${carteiraModDecrypt}>`)
                                .addFields(
                                    { name: 'R$', value: '( '+carteira[0]+' )', inline: true },
                                    { name: 'FebCoin', value: '( '+carteira[1]+' )', inline: true },
                                    { name: 'Transferencias', value: 'PIX: '+transferencias[0]+'  //  F.C.: '+transferencias[1], inline: true },
                                    { name: 'Carteira PIX:', value: carteiraModDecrypt, inline: true },
                                    { name: 'Carteira FebCoin:', value: carteiraModCrypt, inline: true },
                                )
                                .setThumbnail('https://i.imgur.com/oQj5iJ8.png')
                                .setTimestamp()
                
            
                                msg.channel.send({ embeds: [embedConta]});

                                }
                            break;
                        
                        //-------------------------------------------------//

                default:
                    msg.reply('Favor, escolha um Sub-Comando > **'+subcmd+'**');
                    break;
       }

        setTimeout(() => msg.delete(), 3000);

    }//IF

    async function cryptWallet(userIdWallet)
    {
        // var userIdWallet = msg.author.id;
        //  CHAVE/CARTEIRA FEBCOIN (FORMULA)
        //  (18char)  > 000000000000000000
        //  PINGUINID > 272473407512248322
        //-------------------------------------//
        //  1 = G  4 = A  7 = F
        //  2 = H  5 = B  8 = E
        //  3 = X  6 = C  9 = D  0 = P
        //-------------------------------------//

        userIdWallet = userIdWallet.replaceAll('1', 'G');
        userIdWallet = userIdWallet.replaceAll('2', 'H');
        userIdWallet = userIdWallet.replaceAll('3', 'X');
        userIdWallet = userIdWallet.replaceAll('4', 'A');
        userIdWallet = userIdWallet.replaceAll('5', 'B');
        userIdWallet = userIdWallet.replaceAll('6', 'C');
        userIdWallet = userIdWallet.replaceAll('7', 'F');
        userIdWallet = userIdWallet.replaceAll('8', 'E');
        userIdWallet = userIdWallet.replaceAll('9', 'D');
        userIdWallet = userIdWallet.replaceAll('0', 'P');

        // return console.log(`Encrypted Wallet: ${userIdWallet}`);
        return userIdWallet;
    }



    
}//CMD-ALL

async function decryptWallet(userIdWallet)
{
    // var userIdWallet = msg.author.id;
    //  CHAVE/CARTEIRA FEBCOIN (FORMULA)
    //  (18char)  > 000000000000000000
    //  PINGUINID > 272473407512248322
    //-------------------------------------//
    //  1 = G  4 = A  7 = F
    //  2 = H  5 = B  8 = E
    //  3 = X  6 = C  9 = D  0 = P
    //-------------------------------------//

    userIdWallet = userIdWallet.replaceAll('G', '1');
    userIdWallet = userIdWallet.replaceAll('H', '2');
    userIdWallet = userIdWallet.replaceAll('X', '3');
    userIdWallet = userIdWallet.replaceAll('A', '4');
    userIdWallet = userIdWallet.replaceAll('B', '5');
    userIdWallet = userIdWallet.replaceAll('C', '6');
    userIdWallet = userIdWallet.replaceAll('F', '7');
    userIdWallet = userIdWallet.replaceAll('E', '8');
    userIdWallet = userIdWallet.replaceAll('D', '9');
    userIdWallet = userIdWallet.replaceAll('P', '0');

    // return console.log(`Encrypted Wallet: ${userIdWallet}`);
    return userIdWallet;
}

async function cadTransferencia(tipoMoeda, deUser, paraUser, valorTransferido, hexUserId)
{
    // console.log(`TipoMoeda: ${tipoMoeda}, deUser: ${deUser}, paraUser: ${paraUser}, valorTransferido: ${valorTransferido}, hexUserId: ${hexUserId}`)

    if(tipoMoeda === 'febcoin')
    {
        tipoMoeda = 1;
    }
    else if(tipoMoeda === 'pix')
    {
        tipoMoeda = 0;
    }

    // HEX CONVERTER
    //272473407512248322
    //
    var timeUnixNow = await new Date().getTime()/100;
    timeUnixNow = await Math.round(timeUnixNow);
    timeUnixNow[0] = await 0;
    timeUnixNow[0] = await 0;
    hexUserId = await parseInt(hexUserId)/100000000000;
    hexUserId = await Math.round(hexUserId);
    hexUserId = await hexUserId.toString();
    timeUnixNow = await timeUnixNow.toString();

    //USER ID (7 CHARACTERS)

    hexUserId = hexUserId.replaceAll('1', 'A');
    hexUserId = hexUserId.replaceAll('2', 'd');
    hexUserId = hexUserId.replaceAll('3', 'F');
    hexUserId = hexUserId.replaceAll('4', 'g');
    hexUserId = hexUserId.replaceAll('5', 'H');
    hexUserId = hexUserId.replaceAll('6', 'n');

    hexUserId = hexUserId.replaceAll('7', '2');
    hexUserId = hexUserId.replaceAll('8', '4');
    hexUserId = hexUserId.replaceAll('9', '6');
    hexUserId = hexUserId.replaceAll('0', '8');

    //TIME UNIX NOW (11)

    timeUnixNow = timeUnixNow.replaceAll('1', 'a');
    timeUnixNow = timeUnixNow.replaceAll('3', 'f');
    timeUnixNow = timeUnixNow.replaceAll('4', 'G');
    timeUnixNow = timeUnixNow.replaceAll('6', 'N');
    timeUnixNow = timeUnixNow.replaceAll('7', 'L');
    timeUnixNow = timeUnixNow.replaceAll('9', '0');

    // return console.log(`Hex: ${hexUserId}${timeUnixNow}`);

    return [tipoMoeda, deUser, paraUser, valorTransferido, hexUserId]
}

module.exports.help = {
    name: 'bank',
    alias: 'banco',
	description: 'Sistema Bancário (Membro/Staff)'
};
const mysql = require("mysql2/promise");
const config = require("../../db-config.json");

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const sqlChk = "SELECT token FROM allbot.usuarios WHERE discordid =";
const sqlCad = "UPDATE allbot.usuarios SET `token` = 'xx' WHERE (`id` = '4') and (`discordid` =";

async function ChkToken(dcid) {
    var retorno = 9;
    console.log('[BD] Iniciando CadToken');

            await pool.query(`${sqlChk}'${dcid}';`)
            .then(function(rows, fields) {
                console.log('[BD] Validando Token');


                if (rows[0][0].token == null || rows[0][0].token == undefined || rows[0][0].token == '')
                {
                    retorno = 0;
                    cadToken(dcid).then(async (resultCadToken) => {
                        console.log(resultCadToken);
                    }).catch((err3) => {
                        console.error(err3);
                    });
                }
                else if (!(rows[0][0].token == null || rows[0][0].token == undefined  || rows[0][0].token == ''))
                {
                    console.log('[BD] Token Já Existente!');
                    retorno = 1;
                }

            }).catch(err => { console.error(err); })
            return retorno;
}

async function cadToken(dcid) {
    var retornoCad = 9;

    var randomAlphanumeric = function(length) {
        var text = "";
        var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
        };

    // await pool.query(`${sqlCad}'${dcid}');`)
    await pool.query(`${sqlCad}'${dcid}');`)
    .then(function(rowsCad, fieldsCad) {
        console.log('[BD] Gerando Token...');
        var encryptToken =
`
${randomAlphanumeric(1)}${dcid[0]}${dcid[1]}${randomAlphanumeric(1)}${dcid[2]}${dcid[3]}${randomAlphanumeric(2)}${dcid[4]}${dcid[5]}${randomAlphanumeric(2)}${dcid[6]}${dcid[7]}${randomAlphanumeric(2)}${dcid[8]}${dcid[9]}${randomAlphanumeric(2)}${dcid[10]}${dcid[11]}${randomAlphanumeric(1)}${dcid[12]}${dcid[13]}${randomAlphanumeric(1)}${dcid[14]}${dcid[15]}${randomAlphanumeric(2)}
`;
        retornoCad = 3;
    })
    .catch(err => { console.error(err); })
    return retornoCad;
}

module.exports = { ChkToken }
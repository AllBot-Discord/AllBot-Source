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

// // const connection = mysql.createConnection({
// //     host: configdev.host,
// //     user: configdev.user,
// //     database: configdev.database,
// //     password: configdev.password,
// //     port: configdev.port,
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0
// //   });

async function exibirConta(cmd) {
    var bal;
    var feb;
    var repValue;
            await pool.query(cmd)
            .then(async function(rows, fields) {
                bal = await rows[0][0].balance;
                feb = await rows[0][0].febcoin;
            })
            .catch(err => {
                })
                return [bal, feb];

}

async function exibirTaxas() {
    var taxPix;
    var taxCrypt;
    await pool.query("SELECT taxabanco, taxacrypto FROM allbot.banco;")
    .then(function(rows, fields) {
        taxPix = rows[0][0].taxabanco
        taxCrypt = rows[0][0].taxacrypto;
        // console.log(resultado[0][0]);
    })
    .catch(err => {
        console.error(err);
        })
        return [taxPix, taxCrypt];
}

async function exibirTransferencias(cmd) {
    var carteira = ['',''];
            await pool.query(cmd)
            .then(function(rows, fields) {
                carteira[0] = rows[0][0].balance;
                carteira[1] = rows[0][0].febcoin;
            })
            .catch(err => {
                // console.error(err);
                carteira[0] = 'null';
                carteira[1] = 'null';
                })
                return carteira;
}

async function exibirQtdConta(cmd) {
    var pix;
    var febcoin;
            await pool.query(cmd)
            .then(function(rows, fields) {
                pix = rows[0][0].pixqtd;
                febcoin = rows[0][0].coinqtd;
            })
            .catch(err => {
                })
                return [ pix, febcoin ];
}

async function cadTransferencia(idEnvio, idRecibo, tipoEnvio, valEnvio, hexEnvio) {

            await pool.query(
                ""
            )
            .then(function(rows, fields) {
                // pix = rows[0][0].pixqtd;
                // febcoin = rows[0][0].coinqtd;
            })
            .catch(err => {
                })
                return 1;
}

async function enviarPix(cmdSetar, cmdRemover, cmdSetarBank) {

    await pool.query(cmdSetar)
    .then(function(rows, fields) {
    })
    .catch(err => {
        console.error(err);
        })

        await pool.query(cmdRemover)
    .then(function(rows, fields) {
    })
    .catch(err => {
        console.error(err);
        })

        await pool.query(cmdSetarBank)
    .then(function(rows, fields) {
    })
    .catch(err => {
        console.error(err);
        })
}

async function enviarFebcoin(cmdSetar, cmdRemover, cmdSetarBank) {

    await pool.query(cmdSetar)
    .then(function(rows, fields) {
    })
    .catch(err => {
        console.error(err);
        })

        await pool.query(cmdRemover)
    .then(function(rows, fields) {
    })
    .catch(err => {
        console.error(err);
        })

        await pool.query(cmdSetarBank)
    .then(function(rows, fields) {
    })
    .catch(err => {
        console.error(err);
        })
}

module.exports = { exibirConta, exibirTaxas, exibirTransferencias, enviarPix, enviarFebcoin, exibirQtdConta, cadTransferencia }
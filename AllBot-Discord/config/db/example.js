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

async function cadToken(sqlChk, sqlCad) {
    // console.log('Iniciando CadUser');
            pool.query(sqlChk)
            .then(function(rows, fields) {
                // console.log('Validando Cadastro...');

                //SEM
                if (rows[0][0].value == 0)
                {
                    pool.query(sqlCad)
                    .then(function(rows, fields) {
                        // console.log(rows);
                        console.log('Novo Membro - Cadastrado com Sucesso');
                    })
                    .catch(err2 => {
                            console.error(err2);
                    })
                    //FIM IF == O

                }//COM
                else if (rows[0][0].value == 1)
                {

                }

            }).catch(err => { console.error(err); })

}

module.exports = { cadToken }
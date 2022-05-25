

async function sqlCon()
{
  if(global.connection && global.connection.state != 'disconnected')
  {
    return global.connection;
  }
  
  // console.log('MySql - Conectado');

  global.connection = connection;
  
  return connection;
}
  
async function sqlOpen()
{

}

async function sqlClose()
{
    
}


  function execSql()
  { 
    var log = 'teste';
    
    connection.query("SELECT * FROM allbot.usuarios;", function (err, result) {
      if (err) {
        throw err;
      }
      log = result;
      return result;
    })
    // console.log(log);
  }

async function sqlTest() {
  var tst;
  // const contst = await mysql.createConnection({host:'localhost', user: 'allbot', password: 'root', database: 'allbot'});

  connection.promise().query("SELECT 4+5 AS solution")
          .then(function(rows, fields) {
              tst = rows[0][0].solution;
              if(tst == 9 || tst == '9')
              {
                console.log('[BD] - Conectado');
              }
              else
              {
                console.log('[BD] - Falha ao se Conectar');
              }
          })
          .catch(err => { console.error('[BD] - Falha ao se Conectar. Causa:\n'+err); })
              
}

module.exports = { sqlOpen, sqlClose, sqlCon, sqlTest };
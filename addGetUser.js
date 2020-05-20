const Koa = require('koa');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("emails.db") //:memory:
db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, first_name TEXT, last_name TEXT, disabled INTEGER, last_contacted TEXT)");
function addUser(info){
     
             console.log('info', info) 
        var stmt = db.all("INSERT INTO users (email, first_name,last_name, disabled, last_contacted) values(?,?,?,?,?)", 
        [info.email, info.first_name, info.last_name, 0 , (new Date()).toISOString()]);

 
    
    }
    function doSql(sql){
        let result = []
        return new Promise((resolve,reject)=> { db.all(sql, [], (err, rows) => {
            let result = []
            if (err) {
              throw err;
            }
            rows.forEach((row) => {
               // console.log(row.email, row.disabled, row.first_name, row.last_name, row.last_contacted)
              result.push({email:row.email, disabled:row.disabled, first_name:row.first_name, last_name:row.last_name, last_contacted:row.last_contacted})
            });
            resolve(result)
          });
       
    })
}
   async function getList(){
     
        let sql = "SELECT * from users where (disabled=0 or disabled = NULL)";
        console.log(await doSql(sql))
        
         db.close();
       }
if(process.argv[2] === 'get'){
    getList()
}
if(process.argv[2] === 'add'){
    if(!process.argv[3]){
        console.log( "need a json object similar to { \"email\", \"first_name\",\"last_name\", \"disabled\", \"last_contacted\"}")
        return
    }
    let info = JSON.parse(process.argv[3])
    if(!info){
        console.log( "need a json object similar to { \"email\", \"first_name\",\"last_name\", \"disabled\", \"last_contacted\"}")
    }
    addUser(info)
}


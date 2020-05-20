const Koa = require('koa');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("emails.db") //:memory:
db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, first_name TEXT, last_name TEXT, disabled INTEGER, last_contacted TEXT)");
const app = new Koa();
//var bodyParser = require('koa-bodyparser');
// response
//app.use(bodyParser())
app.use(async ctx => {
    ctx.request.body
    if(ctx.request.method == 'GET'){
    if (ctx.path.match(/unsubscribe/g)) {
        let query = ctx.request.query
        if(query.email){
           ctx.body = 'successfully set the bit that unsubscribes you from the list'
           unsubscribe(query.email)
        }
    }
   }
  //await next();

});
function unsubscribe(email){
         db.serialize(function() {  
        var stmt = db.prepare("UPDATE users SET disabled = 1 where email=?", function(err){ console.log(err)});
        stmt.run(email);
        stmt.finalize();
      });
}
app.listen(3000);
 
//db.close();





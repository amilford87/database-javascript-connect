const settings = require("./settings"); //settings.json
const myArgs = process.argv.slice(2);
const knex = require("knex") ({
    client: 'pg',
    connection: {
      user	   : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    }
});

function finish(){
    knex.destroy();
}

knex('famous_people').insert({first_name: myArgs[0], last_name: myArgs[1], birthday: myArgs[2]})
.asCallback (function (err, rows){
    if (err){
        return console.error("error running query", err);
    }
    console.log("done");
    finish();
});
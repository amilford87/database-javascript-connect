const pg = require("pg");
const settings = require("./settings"); //settings.json
const myArgs = process.argv.slice(2)[0];

const client = new pg.Client({
    user		 : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
});


function formatDate(date){
    return date.toISOString().substr(0, 10);
}

function findByFirstName (array){
    let foundString = `Searching ...\nFound ${array.length} person(s) by the name '${array[0].first_name}'`;
    for (var i = 0; i < array.length; i++){
        foundString += `\n- ${i + 1} ${array[i].first_name} ${array[i].last_name}, born '${formatDate(array[i].birthday)}'`;
    } 
    return foundString;
    
}

client.connect((err) => {
	if (err) {
		return console.error("Connection Error", err);
	}

	client.query("SELECT * FROM famous_people WHERE first_name = $1::text", [myArgs], (err, result) => {
		if (err) {
			return console.error("error running query", err);
		}
        
        console.log(findByFirstName(result.rows)); //output of query
		client.end();
	});
});
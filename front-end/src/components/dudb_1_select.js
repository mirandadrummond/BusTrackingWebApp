var mysql = require(mysql)
    
var con = mysql.createConnection({
    host: "dockerlab.westeurope.cloudapp.azure.com",
    user: "DUDB_1",
    password: "C4dbvCBlqHpbpAnJFopeJcf1wgV7mM4Efx5hTgzeQYo",
    database: "DUDB_1"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM bus_stop", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

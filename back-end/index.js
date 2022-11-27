const express = require('express')
const mysql_connector = require('mysql');
const cors = require('cors')
// import * as express from 'express'
// import * as mysql_connector from 'mysql'
const app = express()
app.use(cors())
const port = 4000
const connection = mysql_connector.createConnection({
    host: "dockerlab.westeurope.cloudapp.azure.com",
    user: "DUDB_1",
    password: "C4dbvCBlqHpbpAnJFopeJcf1wgV7mM4Efx5hTgzeQYo",
    database: "DUDB_1"
});

app.get('/bus_stop', (req, res) => {
  connection.query("SELECT name FROM bus_stop", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
});
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port} :)`)
})

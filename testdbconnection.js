//requires testdbconnection.js
const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
var dbcon = require("./connection.js")

const app = express();
app.use(express.json()); 

//prueba de SELECT
app.get('/', async (req, res) => {
    var content;
    var sqlQuery = "SELECT * FROM peliculas";
    await dbcon.query(sqlQuery, (err, data) => {
        if (err)
            throw err;
        dbcon.end();
        content = data;
        res.send({
            response: content
        })
    }) ;
});
//prueba de INSERT
app.post('/', async (req, res) => {
    var name = req.body.name;
    var year = req.body.year;
    var description = req.body.description;
    var values = [name, year, description];
    var sqlQuery = "INSERT INTO peliculas (ID, name, year, description) VALUES (NULL, ?) "
    dbcon.query(sqlQuery,[values], (err, data) => {
        if (err) 
            throw err;
        dbcon.end();
    })
    res.send("Peliculas agregadas");
});

//prueba de delete
app.delete("/:id", (req,res)=>{
    var id = req.params.id;
    console.log(id)
    var sqlQuery = "DELETE FROM peliculas WHERE ID = ?"
    try{
        dbcon.query(sqlQuery, id,(err,data) => {
            res.status(200).send("eliminado");
        })
    }
    catch (err){
        res.sendStatus(404);
    }
});

//prueba de update
app.put('/:id', (req, res) =>{
    var id = req.params.id; //por ruta
    var name = req.body.name; //por formulario
    var year = req.body.year;
    var description = req.body.description;
    var values = [name, year, description, id]; 
    var sqlQuery = "UPDATE peliculas set name = ?, year = ?, description = ? WHERE ID = ?"
    try{
        dbcon.query(sqlQuery, values,(err,data) => {
            res.status(200).send("editado");
        })
    }
    catch (err){
        res.sendStatus(404);
    }
});

app.listen(3000, () => console.log("works!"));

//test sin usos
/*var query = connection.query('SELECT * FROM peliculas', function(error, result, fields){
    if(error){
       throw error;
    }else{
       var resultado = result;
       if(resultado.length > 0){
        console.log(resultado);
        }else{
        console.log('No hay registros activos');
        }
    }
 });
app.get("/", async(req, res) => {

})*/
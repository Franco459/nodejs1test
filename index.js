const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

//get devuelve en el slash, caso contrario en raiz res responde
app.get("/outfit", (req, res) => {
    const numbs = [ "1", "2" ];
    const colors = ["red", "green"];
    const names = ["fran", "gabri"];
    res.json({
        numbs,
        colors,
        names,
    });
});
//get by id
app.get("/comentarios/:id", async(req,res) => {
    var id = req.params.id;
    let content;
    try{
        content = await fs.readFile(`data/comentarios/${id}.txt`, "utf-8");
    }
    catch (err){
        return res.sendStatus(404);
    }
    res.json({
        content: content 
    });
})
//crearnuevo
app.post("/comentarios", async(req, res) => {
    var id = uuid();
    const commit = req.body.commit;
    if (!commit){
        return res.sendStatus(400);
        console.log(id);
    }
    await fs.mkdir("data/comentarios", {recursive: true});
    await fs.writeFile(`data/comentarios/${id}.txt`, commit);
    res.status(201).json({
        id: id
    });
});

app.listen(3000, () => console.log("works!"))
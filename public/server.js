const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
  });


// app.post("/api/notes", function(req, res){
//     var newNote = req.body;
    
// })


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const db = require('./public/db.json')

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", function(req, res) {
    return res.json(db)
  });

  app.post("/api/notes", function(req, res) {
    const newNote = JSON.stringify(req.body);
    console.log(newNote)
    fs.appendFile(path.join(__dirname,"/public/db.json"), newNote, function (err) {
      if (err) throw err;
      console.log('Saved!');
    })
    res.json(newNote);
  });

  app.delete("/api/notes/:id", function (req, res) {
    res.send("Note Deleted")
  })
  

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/`)
})
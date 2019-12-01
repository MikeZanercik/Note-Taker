const fs = require("fs");
const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const db = require('./db.json')

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
  return res.json(db)
});


app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  console.log(newNote)
  res.json(db.push(newNote));
  fs.appendFile(path.join(__dirname, "/db.json"), JSON.stringify(newNote),  (err) => {
    if (err) throw err;
    console.log('Saved!');
    console.log(db)
  });
  res.json(db)
  
});

app.delete("/api/notes/:id", (req, res) => {
  res.send("Note Deleted")
})


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`)
})
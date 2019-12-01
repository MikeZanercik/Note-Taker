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
  fs.readFile(path.join(__dirname, "./db.json"), "utf8", (err, data)=>{
    if(err) throw err;
    
    return res.json(JSON.parse(data))
  })
});


app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  db.push({
    id: db.length > 0 ? db[db.length - 1].id + 1 : 1,
    ...newNote
  })
  fs.writeFile(path.join(__dirname, "./db.json"), JSON.stringify(db), err => {
    if (err) throw err;
    res.json(db)
  });

});

app.delete("/api/notes/:id", (req, res) => {
  fs.writeFile(path.join(__dirname, "./db.json"), JSON.stringify(db.filter(note => note.id !== parseInt(req.params.id))), err => {
    if (err) throw err;
    // res.json(db)
    res.send("Deleted")
  })
})


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`)
})
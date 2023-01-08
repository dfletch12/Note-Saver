const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
    });

    app.post('/api/notes', (req, res) => { 
        let notes= fs.readFileSync('./db/db.json');
        notes = JSON.parse(notes);
        console.log(req);
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };

        notes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.json(notes);

    });

    app.delete('/api/notes/:id', (req, res) => {
        let notes =JSON.parse(fs.readFileSync('./db/db.json'));
        let deleteNote = notes.filter(N => N.id !== req.params.id);
        fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
        res.json(deleteNote);
    });
};

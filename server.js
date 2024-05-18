const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const fs = require('fs/promises');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ritik',
        database: 'loginformytvideo'
    }
});

const app = express();

let initialPath = path.join(__dirname, 'public');   
const filePath = path.join(__dirname, 'public', 'jainsongs');
console.log('Attempting to access file at:', filePath);

app.use(express.static(initialPath));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
});

app.get('/ritik', (req, res) => {
    res.sendFile(path.join(initialPath, "ritik.html"));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, "register.html"));
})
app.use(express.static(path.join(__dirname, 'jainsongs')));
app.get('/jainsongs', async (req, res) => {
    try {
        const folders = await fs.readdir(filePath, { withFileTypes: true });
        const folderLinks = folders
            .filter(dirent => dirent.isDirectory())
            .map(dirent => `<a href="/jainsongs/${dirent.name}">${dirent.name}</a>`)
            .join('<br>');

        res.send(folderLinks);
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve the contents of a folder (list of songs)
app.get('/jainsongs/:folder', async (req, res) => {
    const { folder } = req.params;
    const folderPath = path.join(filePath, folder);
    console.log(folderPath)

    try {
        console.log(`Reading contents of folder: ${folderPath}`);

        const files = await fs.readdir(folderPath);
        const fileLinks = files.filter(file => file.endsWith('.mp3'))
            .map(file => `<a href="/jainsongs/${folder}/${file}">${file}</a>`)
            .join('<br>');

        res.send(fileLinks);
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve the info.json file of a folder
app.get('/jainsongs/:folder/info.json', async (req, res) => {
    const { folder } = req.params;
    const infoPath = path.join(filePath, folder, 'info.json');
        console.log(infoPath)
    try {
        const infoData = await fs.readFile(infoPath, 'utf-8');
          console.log(infoData)
        res.json(JSON.parse(infoData));
    } catch (error) {
        console.error('Error reading info.json:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.json('fill all the fields');
    } else {
        db("users").insert({
                name: name,
                email: email,
                password: password
            })
            .returning(["name", "email"])
            .then(data => {s
                res.json(data[0]);
            })
            .catch(err => {
                if (err.detail.includes('already exists')) {
                    res.json('email already exists');
                }
            });
    }
});

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;
    db.select('name', 'email')
        .from('users')
        .where({
            email: email,
            password: password
        })
        .then(data => {
            if (data.length) {
                res.json(data[0]);
            } else {
                res.json('email or password is incorrect');
            }
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

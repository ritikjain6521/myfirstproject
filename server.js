const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const knex = require('knex');
const { read } = require('fs');


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
app.get('/:folder(*)', async (req, res) => {
    const { folder } = req.params;
    

    const folderPath = path.join(initialPath, folder);
    try {
        // Check if the requested folder exists
        const folderStats = await fs.stat(folderPath);
        if (!folderStats.isDirectory()) {
            return res.status(404).json({ error: 'Not a directory' });

        

            let response = await a.text();

        }

        // Read files from the directory and send them as a response
        const files = await fs.readdir(folderPath);
        res.send(files);
        

    } catch (error) {
        console.error(error);
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

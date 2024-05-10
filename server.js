const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
          host: 'dpg-comiofsf7o1s73f58400-a',
        user: 'postgresql_ritik_user',
        password: 'TGabXCb5wqNuneTDqtk8WKJ37XVcI00A',
        database: 'postgresql_ritik'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");


app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/ritik', (req, res) => {
    res.sendFile(path.join(intialPath, "ritik.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})
app.get('/:folder', (req, res) => {  

    const folder = req.params.folder;
    res.send(`You requested the folder: ${folder}`);
 });
 
 app.get('/jainsongs/', async (req, res) => {
     try {
         const directoryPath = path.join(__dirname, 'jainsongs');
         const files = await fs.readdir(directoryPath);
         // Assuming you want to send a list of files in the directory back to the client
         res.send(files);
     } catch (error) {
         console.error('Error reading directory:', error);
         res.status(500).send('Internal Server Error');
     }
 });
app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})

const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const app = express();
const port = 3000;

const adapter = new FileSync('db.json');
const db = low(adapter);
app.set('views', './views');
app.set('view engine', 'pug');

db.defaults({ users : [] }).write();

app.listen(port, () => console.log(`server listen on port ${port}`));

app.get('/', (req, res) => {
    res.render('index.pug', {admin : 'HoangPersievn'});
})

app.get('/user', (req, res) => {
    res.render('users/users.pug', {
        users: db.get("users").value()
    })
})

app.get('/user/search', (req, res) => {
    let q = req.query.q;
    let matchUsers = db.get("users").value().filter( (user) => {
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/users.pug', { users : matchUsers})
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/user/create', (req, res) => {
    res.render('users/create.pug');
});

app.post('/user/create', (req, res) => {
    db.get("users").push(req.body).write();
    res.redirect('/user');
})

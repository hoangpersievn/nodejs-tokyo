const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

let users = [
    { name : 'chuong', nick : 'chuong'},
    { name : 'phuc', nick : 'fuck'},
    { name : 'man', nick : 'man'}
];

app.listen(port, () => console.log(`server listen on port ${port}`));

app.get('/', (req, res) => {
    res.render('index.pug', {admin : 'HoangPersievn'});
})

app.get('/user', (req, res) => {
    res.render('users/users.pug', {
        users: users
    })
})

app.get('/user/search', (req, res) => {
    let q = req.query.q;
    let matchUsers = users.filter( (user) => {
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
    users.push(req.body);
    res.redirect('/user');
})

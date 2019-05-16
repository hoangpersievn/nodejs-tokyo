var express = require('express');
var router = express.Router();

const db = require('../db.js');

router.get('/', (req, res) => {
    res.render('users/users.pug', {
        users: db.get("users").value()
    })
})

router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchUsers = db.get("users").value().filter( (user) => {
        return user.name.indexOf(q) !== -1;
    });
    res.render('/users.pug', { users : matchUsers})
})

router.get('/create', (req, res) => {
    res.render('users/create.pug');
});

router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view.pug', { user: user });
})

module.exports = router;
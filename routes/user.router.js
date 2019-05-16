const express = require('express');
const router = express.Router();
const shortid = require('shortid'); 

const db = require('../db.js');

router.get('/', (req, res) => {
    res.render('users/users.pug', {
        users: db.get("users").value()
    })
});

router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchUsers = db.get("users").value().filter( (user) => {
        return user.name.indexOf(q) !== -1;
    });
    res.render('../views/users/users.pug', { users : matchUsers})
});

router.get('/create', (req, res) => {
    res.render('users/create.pug');
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view.pug', { user: user });
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect('/user');
});

module.exports = router;
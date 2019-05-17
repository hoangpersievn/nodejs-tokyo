const db = require('../db.js');
const shortid = require('shortid'); 

module.exports.index = (req, res) =>{
    res.render('../views/users/users.pug', {
        users: db.get("users").value()
    })
}

module.exports.search = (req, res) => {
    let q = req.query.q;
    let matchUsers = db.get("users").value().filter( (user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('../views/users/users.pug', { users : matchUsers})
}

module.exports.create = (req, res) => {
    res.render('users/create.pug');
};

module.exports.getId = (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view.pug', { user: user });
};

module.exports.createUser = (req, res) => {
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect('/user');

};
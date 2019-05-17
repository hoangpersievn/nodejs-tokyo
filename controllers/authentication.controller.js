const db = require('../db.js');
const shortid = require('shortid'); 

module.exports.authen = (req, res, next) => {
    res.render('auth/authen.pug');
}

module.exports.authenUser = (req, res, next) => {
    let username = req.body.name;
    let password = req.body.password;

    let user = db.get('users').find({ name: username }).value();

    if(!user){
        res.render('auth/authen.pug', { erruser : "Username does not exist." });
        return;
    };

    if( password !== user.password){
        console.log(password);
        console.log(user.password);
        res.render('auth/authen.pug', {
            errpass : "Wrong password."
        });
        return;
    };
  
    res.cookie('userId', user.id);
    res.redirect('/user');
}
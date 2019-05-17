const db = require('../db.js');

module.exports.requireAuthen = (req, res, next) => {
    if(!req.cookies.userId)
    {
        res.redirect('/authen/login');
        return;
    }
    if(!db.get('users').find({ id : req.cookies.userId}))
    {
        res.redirect('/authen/login');
        return;
    }
    next();
    
}
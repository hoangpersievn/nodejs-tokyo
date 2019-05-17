module.exports.postCreate = function(req, res, next){
    let err = [];
    if(!req.body.name){
        err.push('Name is required');
    }
    if( err.lenght ){
        res.render('users/create.pug', { err : err });
        return;
    };
    next();
};
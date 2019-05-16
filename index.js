const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user.router.js');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');


app.listen(port, () => console.log(`server listen on port ${port}`));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('index.pug', {admin : 'HoangPersievn'});
})

app.post('/user/create', (req, res) => {
    db.get("users").push(req.body).write();
    res.redirect('/user');
});

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.route.js');
const authenRouter = require('./routes/authentication.route');
const requireAuthen = require('./middlewares/requireAuthen.middleware');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');


app.listen(port, () => console.log(`server listen on port ${port}`));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use('/user', requireAuthen.requireAuthen, userRouter);
app.use('/authen', authenRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.pug', {admin : 'HoangPersievn'});
});



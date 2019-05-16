const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const userRouter = require('./routes/user.route.js');

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
});



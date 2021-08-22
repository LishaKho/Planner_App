require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(cookieParser());
require('./config/mongoose.config');

require('./routes/user.routes')(app);
require('./routes/task.routes')(app);

const server = app.listen(process.env.MY_PORT, ()=>{
    console.log('Listening at port ' + process.env.MY_PORT)
})




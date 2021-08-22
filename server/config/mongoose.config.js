
const mongoose = require('mongoose');

const DbName = process.env.DbName;

mongoose.connect('mongodb://localhost/' + DbName, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(()=> console.log('Established a connection to the database'))
    .catch(error=> console.log('Something went wrong when connecting to the database',
        error));

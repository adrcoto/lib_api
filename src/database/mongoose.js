const mongoose = require('mongoose');
const db = 'lib_api'
const host = 'mongodb://127.0.0.1:27017/' + db;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(host, options).then(()=> {
        console.log('Successfully connected to ' + '\'' + db + '\'' + ' database!');
    }).catch(e => {
    console.log('Error connecting to the database:', e);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://webTechUser:nc4dkc9LIehbAcTp@cluster0-woi6a.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('mongoose is connected');
});
db.on('close', () => {
    console.log('mongoose has been disconnected');
});

module.exports = db;

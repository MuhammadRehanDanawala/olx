const mongoose = require('mongoose');


module.exports.connectWithDB = () => {

    mongoose.connect('mongodb+srv://pakistan:pakistan@cluster0.d9xbx.mongodb.net/olx?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.once('error', (err) => {
        console.log("Error in connecting to DB")
        console.log(err);
    });

    db.once('open', () => {
        console.log("Connected to DB successfully..!")
     })

}
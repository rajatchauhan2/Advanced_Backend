const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connect to DB successful");
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = connectToDb;
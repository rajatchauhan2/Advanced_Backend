// const mongoose = require('mongoose');


// function connectToDb() {
//     mongoose.connect(process.env.DB_CONNECT)
//     .then(() => {
//         console.log("Connect to DB successful");
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// }

// module.exports = connectToDb;



const mongoose = require('mongoose');

async function connectToDb() {
    if (!process.env.DB_CONNECT) {
        throw new Error("Environment variable DB_CONNECT is not defined.");
    }

    try {
        await mongoose.connect(process.env.DB_CONNECT, {
        });
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with failure
    }

    // Close the connection when the application is shutting down
    process.on('SIGINT', async () => {
        await mongoose.disconnect();
        console.log("Disconnected from the database");
        process.exit(0);
    });
}

module.exports = connectToDb;

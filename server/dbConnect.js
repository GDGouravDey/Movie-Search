const mongoose = require("mongoose");

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true };
    mongoose.connect(process.env.DB_CONNECT, connectionParams);

    mongoose.connection.on("connected", () => {
        console.log("Connected to the Database successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.error(`Error while connecting to the Database. \n${err}`);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from the Database");
    });
}

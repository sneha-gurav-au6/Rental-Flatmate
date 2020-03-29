var mongoose = require("mongoose");
const connectDb = async () => {
    await mongoose.connect("mongodb+srv://imran:imranshaikh@mongodb1-1kxlr.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }).then(
        () => {
            console.log(`Connected to database`)
        },
        error => {
            console.error(`Connection error: ${error.stack}`)
            process.exit(1)
        }
    )
}

connectDb().catch(error => console.error(error))
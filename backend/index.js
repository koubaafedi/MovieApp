import app from './server.js'; // import app that we have previously created and exported in server.js
import mongodb from "mongodb"; // import mongodb to access our database
import dotenv from "dotenv"; // dotenv to access our environment variables.
import MoviesDAO from './dao/moviesDAO.js'; // import and get the reference to the moviesDAO file.

// asynchronous function main() to connect to our MongoDB cluster
// and call functions that access our database
async function main() {
    dotenv.config(); // load in the environment variables
    // create an instance of MongoClient and pass in the database URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    // We retrieve the port from our environment variable.
    // If we can ’ t access it, we use port 8000.
    const port = process.env.PORT || 8000
    try {
        // Connect to the MongoDB cluster
        // We use the await keyword to indicate that we block further execution
        // until that operation has completed.
        await client.connect().then(()=>{
            console.log('connection to database established')
        }); // returns a promise
        //right after connecting to the database and just before we start the server,
        // we call injectDB to get our initial reference to the movies collection in the database
        await MoviesDAO.injectDB(client);
        // app.listen starts the server and listens via the specified port
        app.listen(port, () => {
            // The callback function provided in the 2nd argument is executed
            // when the server starts listening.
            console.log('server is running on port:' + port);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
// With the main() function implemented, we then call it and send any errors to
// the console.
main().catch(console.error);
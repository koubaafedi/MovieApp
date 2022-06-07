import express from 'express'; // import express
import cors from 'cors';// import cors
import movies from './api/movies.route.js';// a separate file to store our routes

const app = express();// create the server
//attach the cors and express.json middleware that express will use
app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);// main url to our app localhost:5000/api/v1/movies
// If someone tries to go to a route that doesn't exist
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
});
export default app; //export app as a module so that other files can import it
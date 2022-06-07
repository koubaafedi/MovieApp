// the movies data access object to allow our code to
// access movie(s) in our database


let movies; // movies stores the reference to the database
//export the class MoviesDAO which contains an async method injectDB
export default class MoviesDAO {
    // injectDB is called as soon as the server starts and provides the database reference to movies.
    static async injectDB(conn) {
        if (movies) {
            // If the reference already exists, we return.
            return;
        }
        try {
            // Else, we go ahead to connect to the database name
            // ( process.env.MOVIEREVIEWS_NS ) and movies collection.
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies');
        } catch (e) {
            // if we fail to get the reference, we send an error message to the console.
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }

    // We next define the method to get all movies from the database
    static async getMovies({// default filter object
                               filters = null,// default filter has no filters
                               page = 0,// retrieves results at page 0
                               moviesPerPage = 20, // will only get 20 movies per page at once
                           } = {}) {
        let query;// will be empty unless a user specifies filters in his retrieval
        // In our app, we provide filtering results by movie title “ title ”
        // and movie rating “ rated ” (e.g. ‘ G ’ , ‘ PG, ’ ‘ R ’ ).
        //So a filters object might
        // look something like:
        // {
        //      title: “dragon”, // search titles with ‘dragon’ in it
        //      rated: “G” // search ratings with ‘G’
        // }
        if (filters) {
            if ("title" in filters) {
                // to search for movie titles containing the user specified search terms
                query = {$text: {$search: filters['title']}};
                // $text allows us to query using multiple words by separating your words with spaces to query for
                // documents that match any of the search terms (logical OR). E.g. “ kill dragon ” .
            } else if ("rated" in filters) {
                query = {"rated": {$eq: filters['rated']}};
            }
        }
        let cursor;
        //our query can potentially match very large sets of documents, a cursor fetches
        // these documents in batches to reduce both memory consumption and network bandwidth usage.
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);
            //When skip and limit is used together, the skip applies first and
            // the limit only applies to the documents left over after the skip.
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query); //get the total number of movies by counting the number of documents in the query
            return {moviesList, totalNumMovies}; //return moviesList and totalNumMovies in an object.
        } catch (e) {
            // If there is any error, we just return an empty moviesList and totalNumMovies to be 0.
            console.error(`Unable to issue find command, ${e}`);
            return {moviesList: [], totalNumMovies: 0};
        }
    }
}


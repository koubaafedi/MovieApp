//movies controller that the route file will use to access the dao file.

import MoviesDAO from '../dao/moviesDAO.js'

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        //When apiGetMovies is called via a URL, there will be a query string in the
        // response object (req.query) where certain filter parameters might be specified
        // and passed in through key-value pairs.
        //For e.g. we have a URL: http://localhost:5000/api/v1/movies?title=dragon&moviesPerPage=15&page=0
        // req.query would return the following JavaScript object after the query string is parsed:
        // {
        //      title: “dragon”,
        //      moviesPerPage:"15",
        //      page: "0"
        // }
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        let filters = {}; //We then start with an empty filters object, i.e. no filters are applied at first.
        if (req.query.rated) {
            //check if the rated query string exists, then add to the filters object.
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            //do the same for title.
            filters.title = req.query.title;
        }
        //We next call getMovies in MoviesDAO that we have just implemented.
        // Remember that getMovies will return moviesList and totalNumMovies.
        const {moviesList, totalNumMovies} = await MoviesDAO.getMovies({filters, page, moviesPerPage});
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        //send a JSON response with the above response object to whoever calls this URL.
        res.json(response);
    }

    static async apiGetMovieById(req, res, next) {
        try {
            //first look for an id parameter which is the value after the ‘/’ in a URL.
            // E.g. locahost:5000/api/v1/movies/id/12345
            //Note the difference between a request query and parameter.
            // In a query, there is a ‘?’ after the URL followed by a key-value e.g. /api/v1/movies?title=dragon
            // In a parameter, it’s the value after ‘/’.
            let id = req.params.id || {};
            let movie = await MoviesDAO.getMovieById(id);
            if (!movie) {
                //If there is no movie, we return an error.
                res.status(404).json({error: "not found"});
                return;
            }
            res.json(movie);//returns us the specific movie in a JSON response
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await MoviesDAO.getRatings();
            res.json(propertyTypes);
        } catch (e) {
            console.log(`api,${e}`);
            res.status(500).json({error: e});
        }
    }
}
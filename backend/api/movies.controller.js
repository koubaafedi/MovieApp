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
}
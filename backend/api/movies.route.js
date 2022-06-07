// movies.route.js will contain routes that different people can go to.

import express from 'express';
import MoviesController from './movies.controller.js';

const router = express.Router(); // get access to express router
//each time there is a request for URL ‘ / ’ , i.e. localhost:5000/api/v1/movies/, we call MoviesController.apiGetMovies.
router.route('/').get(MoviesController.apiGetMovies);
export default router;
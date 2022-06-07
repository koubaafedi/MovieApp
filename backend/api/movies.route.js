// movies.route.js will contain routes that different people can go to.

import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';

const router = express.Router(); // get access to express router
//each time there is a request for URL ‘ / ’ , i.e. localhost:5000/api/v1/movies/, we call MoviesController.apiGetMovies.
router.route('/').get(MoviesController.apiGetMovies);
router.route("/id/:id").get(MoviesController.apiGetMovieById);//route to get a specific movie (with its reviews)
router.route("/ratings").get(MoviesController.apiGetRatings);//route to get all ratings. returns us a list of movie ratings (e.g. ‘ G ’ , ‘ PG ’ , ‘ R ’ ) so that a user can select the ratings from a dropdown menu in the front end.
router.route("/review")
    .post(ReviewsController.apiPostReview) // if the ‘ /review ’ route receives a post http request to add a review, we call apiPostReview.
    .put(ReviewsController.apiUpdateReview) // If ‘ /review ’ receives a put http request to edit a review, call apiUpdateReview
    .delete(ReviewsController.apiDeleteReview); // if ‘ /review ’ receives a delete http request to delete a review, call apiDeleteReview.
export default router;
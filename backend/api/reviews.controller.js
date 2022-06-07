import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            // Previously in MoviesController, we got information from the request ’ s query parameter as
            // we extracted data from the URL e.g. req.query.title.
            // This time, we retrieve the data from the body of the request.
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );// send the information to ReviewsDAO.addReview
            res.json({status: "success "});//return ‘ success ’ if the post works
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            );
            var {error} = ReviewResponse;
            if (error) {
                res.status.json({error});
            }
            if (ReviewResponse.modifiedCount === 0) { //modifiedCount contains the number of modified documents.
                //We check modifiedCount to ensure that it is not zero.
                // If it is, it means the review has not been updated, and we throw an error.
                throw new Error("unable to update review. User may not be original poster");
            }
            res.json({status: "success "});
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    static async apiDeleteReview(req,res,next){
        try{
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            );
            res.json({ status: "success "});
        }catch(e){
            res.status(500).json({ error: e.message});
        }
    }
}
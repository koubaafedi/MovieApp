import mongodb from "mongodb"; //import mongodb to get access to ObjectId

const ObjectId = mongodb.ObjectId;//We need ObjectId to convert an id string to a MongoDB Object id
let reviews;
export default class ReviewsDAO {
    static async injectDB(conn) {
        //if the reviews collection doesn ’ t yet exist in the database,
        // MongoDB automatically creates it for us.
        if (reviews) {
            return;
        }
        try {
            //If reviews is not filled, we then access the database reviews collection
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        } catch (e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            //create a reviewDoc document object
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                //we have to first convert the movieId string to a MongoDB object id.
                movie_id: ObjectId(movieId)
            };
            return await reviews.insertOne(reviewDoc);//insert it into the reviews collection
        } catch (e) {
            console.error(`unable to post review: ${e}`);
            return {error: e};
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                //the first argument: filter for an existing review created by userId and with reviewId.
                {user_id: userId, _id: ObjectId(reviewId)},
                //If the review exists, we then update it with the second argument which contains the new review text and date.
                {$set: {review: review, date: date}}
            );
            return updateResponse;
        } catch (e) {
            console.error(`unable to update review: ${e}`);
            return {error: e};
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            //similar to updateOne, we specify ObjectId(reviewId) to look for an existing review with
            // reviewId and created by userId. If the review exists, we then delete it.
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete review: ${e}`);
            return {error: e};
        }
    }
}
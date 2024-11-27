const express = require('express');
const movieController = require("../controllers/movie");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();


/*Routes*/
// Add New Movie (admin only)
router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

// Get All Movies (all users)
router.get('/getMovies', movieController.getAllMovies);

// Get Movie by ID (all users)
router.get('/getMovie/:id', movieController.getMovie);

// Update Movie by ID (admin only)
router.patch('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);

// Delete Movie by ID (admin only)
router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);

// Add comment to a movie (authenticated users)
router.patch('/addComment/:id', verify, movieController.addComment);

// Get comments from a movie (authenticated users)
router.get('/getComments/:id', verify, movieController.getComments);


module.exports = router;
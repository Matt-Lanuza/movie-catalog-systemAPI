const Movie = require("../models/Movie");



// Add New Movie (admin only)
module.exports.addMovie = async (req, res) => {
	try{
		const { title, director, year, description, genre } = req.body;

        if (!title || !director || !year || !description || !genre) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        if (isNaN(year)) {
          return res.status(400).send({ error: 'Year must be a number' });
        }

        const newMovie = new Movie({
            title,
            director,
            year,
            description,
            genre,
            comments: [] 
        });

        await newMovie.save();

        res.status(201).send(newMovie);

	} catch (error) {
		console.error(error)
		res.status(500).send({ message: 'Server error' });
	}

};



// Get All Movies (all users)
module.exports.getAllMovies = async (req, res) => {
    try {

        const movies = await Movie.find({});

        if (!movies.length) {
            return res.status(404).send({ error: 'No movies found' });
        }

        res.status(200).send({movies});

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};



// Get Movie by ID (all users)
module.exports.getMovie = async (req, res) => {
	try {

		const movieId = req.params.id; 

		const movie = await Movie.findById(movieId);
		if(!movie) {
			return res.status(404).send({ error: 'No movie found' })
		}

		res.status(200).send(movie);

	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
}


// Update Movie by ID (admin only)
module.exports.updateMovie = async (req, res) => {
	try {

		const movieId = req.params.id;
		const { title, director, year, description, genre } = req.body;

		if (typeof year !== 'number') {
		    return res.status(400).send({ error: 'Invalid year' });
		}

		let newUpdatedMovie = {
			title,
			director,
			year,
			description,
			genre
		}

		const updatedMovie = await Movie.findByIdAndUpdate(movieId, newUpdatedMovie, {new: true})
		if(!updatedMovie) {
			return res.status(404).send({ error: "Movie not found" })
		}

		res.status(200).send({
			message: "Movie updated successfully",
			updatedMovie
		});


	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
};


// Delete Movie by ID (admin only)
module.exports.deleteMovie = async (req, res) => {
	try {

		const movieId = req.params.id;

		const deletedMovie = await Movie.findByIdAndDelete(movieId);
		if(!deletedMovie) {
			return res.status(404).send({ error: "Movie not found" });
		}

		res.status(200).send({ message: "Movie deleted successfully" })

	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
}


// Add comment to a movie (authenticated users)
module.exports.addComment = async (req, res) => {
	try {
		const movieId = req.params.id;
		const userId = req.user.id
		const { comment } = req.body;

		console.log("User ID:", userId);

		let addComment = {
			userId: userId,
			comment: comment
		};

		const updatedMovie = await Movie.findByIdAndUpdate(
		      movieId, 
		      { $push: { comments: addComment } },
		      { new: true }
		    );

		if(!updatedMovie) {
			return res.status(404).send({ error: "Movie not found" });
		}

		res.status(200).send({
			message: "Comment added successfully",
			updatedMovie
		})

	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}

}


// Get comments from a movie (authenticated users)
module.exports.getComments = async (req, res) => {
	try {

		const movieId = req.params.id;

		const movie = await Movie.findById(movieId);
		if(!movie) {
			return res.status(404).send({ error: "Movie not found" })
		}

		let getAllComments = movie.comments;
		return res.status(200).send({comments: getAllComments});


	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
}
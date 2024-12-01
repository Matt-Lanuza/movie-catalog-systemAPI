const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes Middleware
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");



require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
    origin: [`http://localhost:3000`, `https://movie-catalog-systemapi-lanuza.onrender.com`, `movie-app-client-delta.vercel.app
`],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//[Database Connection]
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

//[Backend Routes]
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);



if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};
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
    origin: ['http://localhost:3000', 'https://movie-catalog-systemapi-lanuza.onrender.com', 'https://movie-app-client-delta.vercel.app'
],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//[Database Connection]
const MONGODB_STRING = "mongodb+srv://admin:admin123@wdc028-b461.qepkz.mongodb.net/Movie-Catalog-System-API?retryWrites=true&w=majority&appName=WDC028-B461";
mongoose.connect(MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

//[Backend Routes]
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);


const PORT = 4000;
if(require.main === module){
	app.listen(PORT, () => {
	    console.log(`API is now online on port ${PORT}`)
	});
}

module.exports = {app,mongoose};
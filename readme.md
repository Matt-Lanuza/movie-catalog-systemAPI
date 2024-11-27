# Movie Catalog System API


## Team Members:
- **Matt Lanuza**

---

## User Credentials
### Admin User
- **email**: admin@movie.com  
- **password**: admin123  

### Dummy Users
- **email**: dummyuser@movie.com  
- **password**: dummy123 <br><br>

- **email**: teemo@movie.com  
- **password**: teemo123  

---

## Features and Routes:

### User Management:
- **User Registration**  
  - **Route**: `POST /users/register`  
  - **Description**: Allows new users to register with an optional isAdmin property that defaults to false.  
- **User Login**  
  - **Route**: `POST /users/login`  
  - **Description**: Authenticates users and returns a token.

---

### Movies Resources:
- **Add a New Movie**  
  - **Route**: `POST /movies/addMovie`  
  - **Description**: Allows users to add a new workout.  
- **Get all Movies**  
  - **Route**: `GET /movies/getMovies`  
  - **Description**: Fetches all movies.
- **Get a Movie by ID**  
  - **Route**: `GET /movies/getMovie/:id`  
  - **Description**: Fetch a movie by its ID.
- **Update a Movie by ID**  
  - **Route**: `PATCH /movies/updateMovie/:id`  
  - **Description**: Updates the details of an existing movie, identified by its ID.
- **Delete a Movie by ID**  
  - **Route**: `DELETE /movies/deleteMovie/:id`  
  - **Description**: Deletes a movie from the database by its ID.
- **Add Comment**  
  - **Route**: `PATCH /movies/addComment/:id`  
  - **Description**:  Allows logged-in users to add a comment to a specific movie, identified by its ID.
- **Get Comments**  
  - **Route**: `GET /movies/getComments/:id`  
  - **Description**:  Allows logged-in users to view comments associated with a specific movie, identified by its ID.

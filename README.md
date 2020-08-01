# Full Stack API Final Project
## Overview
This is the final project in "Full Stack API" course in Udacity's Full-stack nano degree. It demonstrates the ability to interact with database performing crud operations on the backend using flask python framework & postgres database, building the proper frontend handling of the quiz using react.

## Project description
Udacity is invested in creating bonding experiences for its employees and students. A bunch of team members got the idea to hold trivia on a regular basis and created a  webpage to manage the trivia app and play the game, but their API experience is limited and still needs to be built out. 

That's where you come in! Help them finish the trivia app so they can start holding trivia and seeing who's the most knowledgeable of the bunch. The application must:

1) Display questions - both all questions and by category. Questions should show the question, category and difficulty rating by default and can show/hide the answer. 
2) Delete questions.
3) Add questions and require that they include question and answer text.
4) Search for questions based on a text query string.
5) Play the quiz game, randomizing either all questions or within a specific category. 

Completing this trivia app will give you the ability to structure plan, implement, and test an API - skills essential for enabling your future applications to communicate with others. 

## Backend Todo
- [x] Use Flask-CORS to enable cross-domain requests and set response headers. 
- [x] Create an endpoint to handle GET requests for questions, including pagination (every 10 questions). This endpoint should return a list of questions, number of total questions, current category, categories. 
- [x] Create an endpoint to handle GET requests for all available categories. 
- [x] Create an endpoint to DELETE question using a question ID. 
- [x] Create an endpoint to POST a new question, which will require the question and answer text, category, and difficulty score. 
- [x] Create a POST endpoint to get questions based on category. 
- [x] Create a POST endpoint to get questions based on a search term. It should return any questions for whom the search term is a substring of the question. 
- [x] Create a POST endpoint to get questions to play the quiz. This endpoint should take category and previous question parameters and return a random questions within the given category, if provided, and that is not one of the previous questions. 
- [x] Create error handlers for all expected errors including 400, 404, 422 and 500. 
- [ ] Add question rating column
- [ ] Create user model
- [ ] Relate User to Quiz and store their points
- [ ] Add capability to create new categories.

## Frontend Todo
This tasks isn't part of Udacity project. I just liked to add them for better performance and experience
- [x] Replace react with preact
- [x] Remove jQuery and depend on the native browser fetch
- [x] Replace project styles with tailwind
- [x] Improve UI elements across the app
- [ ] Add question rating input & UI
- [ ] Create users leaderboard
- [ ] Add capability to create new categories.


## Stack

### Backend
The `./backend` directory contains the completed Flask and SQLAlchemy app including the models, routes and controllers. 

[View the README.md within ./backend for more details.](./backend/README.md)

### Frontend
The `./frontend` directory contains the completed React/Preact frontend to consume the data from the Flask server.
The frontend was updated to use Preact & tailwind css for maximum performance and user experience.

[View the README.md within ./frontend for more details.](./frontend/README.md)

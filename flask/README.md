# Full Stack Trivia API Backend documentation


<a name="overview"></a>
# Overview
This documentation is aimed to make you familiar with the work done on this API, how to interact with it's endpoints and what to expect as a response.

<a name="table-of-contents"></a>
# Table of contents

   * [Overview ](#overview)
   * [Table of contents](#table-of-contents)
   * [Getting Started](#getting-started)
        * [Installing Dependencies](#installing-dependencies)
             * [Python 3.7](#python-3.7)   
             * [Virtual Environment](#virtual-environment)   
             * [PIP Dependencies](#pip-dependencies)   
        * [Database Setup](#database-setup)   
        * [Running the server](#running-the-server)   

   * [Response Codes](#response-codes)
   * [API Resources](#api-resources)
        * [Category Resource](#category-resource)
            * [Get categories](#get-categories)
        * [Question Resource](#question-resource)
            * [Get questions](#get-questions)
            * [Delete questions](#delete-question)
            * [create question](#create-question)
   * [Testing The API](#testing)


<a name="getting-started"></a>
# Getting Started

<a name="installing-dependencies"></a>
### Installing Dependencies

<a name="python-3.7"></a>
#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

<a name="virtual-environment"></a>
#### Virtual Environment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

<a name="pip-dependencies"></a>
#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

<a name="database-setup"></a>
## Database Setup

With Postgres running, restore a database using the trivia.psql file provided. From the backend folder in terminal run:
```bash
psql trivia < trivia.psql
```

<a name="running-the-server"></a>
## Running the server

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
cd flask
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

Setting the `FLASK_ENV` variable to `development` will detect file changes and restart the server automatically.

Setting the `FLASK_APP` variable to `flaskr` directs flask to use the `flaskr` directory and the `__init__.py` file to find the application. 

<a name="response-codes"></a>
# Response Codes 

#### Response Codes
```
200: Success
400: Bad request
404: Cannot be found
422: Unprocessable Entity 
50X: Server Error
```
#### Example Error Message
```json
{
  "details": "404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.", 
  "error": 404, 
  "message": "Not found", 
  "success": false
}
```


<a name="api-resources"></a>
# API Resources

<a name="question-resource"></a>

Category Resource
-------

<a name="get-categories"></a>
### Get categories

* **Description:**
  Fetches a dictionary of categories in which the keys are the ids and the value is the corresponding string of the category.

* **Return:**
  An object with a single key, categories, that contains a object of id: category_string key:value pairs.

* **URL:**
  `/categories`

* **Method:**
  `GET`
  
*  **URL Params:**

   **Optional:**
   `page=<int>`

* **Data Params:**
  None

* **Success Response:**

  * **Code:** 200 <br />
    
    <details>
      <summary>Body (Click to expand)</summary>
      
    ```json
     {
      "categories": {
        "1": "Science", 
        "2": "Art", 
        "3": "Geography", 
        "4": "History", 
        "5": "Entertainment", 
        "6": "Sports"
      }
    }
    ```

    </details>
    
 

* **Sample Call:**

  ```javascript
    fetch("http://127.0.0.1:5000/categories")
  ```


<a name="testing"></a>

Question Resource
-------

<a name="get-question"></a>
### Get questions

* **Description:**
    Used to get all questions paginated.
    
* **Return:**
  A list of questions paginated (10 per page), a list of categories, current category and total questions count.

* **URL:**
  `/questions`

* **Method:**
  `GET`
  
*  **URL Params:**

   **Optional:**
   `page=<int>`

* **Data Params:**
  None

* **Success Response:**

  * **Code:** 200 <br />
    
    <details>
      <summary>Body (Click to expand)</summary>
      
    ```json
    {
      "categories": {
        "1": "Science",
        "2": "Art",
        "3": "Geography",
        "4": "History",
        "5": "Entertainment",
        "6": "Sports"
      },
      "current_category": 1,
      "questions": [
        {
          "answer": "Maya Angelou",
          "category": 4,
          "difficulty": 2,
          "id": 5,
          "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?"
        },
        {
          "answer": "Muhammad Ali",
          "category": 4,
          "difficulty": 1,
          "id": 9,
          "question": "What boxer's original name is Cassius Clay?"
        },
        {
          "answer": "Tom Cruise",
          "category": 5,
          "difficulty": 4,
          "id": 4,
          "question": "What actor did author Anne Rice first denounce, then praise in the role of her beloved Lestat?"
        },
        {
          "answer": "Edward Scissorhands",
          "category": 5,
          "difficulty": 3,
          "id": 6,
          "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
        },
        {
          "answer": "Brazil",
          "category": 6,
          "difficulty": 3,
          "id": 10,
          "question": "Which is the only team to play in every soccer World Cup tournament?"
        },
        {
          "answer": "Uruguay",
          "category": 6,
          "difficulty": 4,
          "id": 11,
          "question": "Which country won the first ever soccer World Cup in 1930?"
        },
        {
          "answer": "George Washington Carver",
          "category": 4,
          "difficulty": 2,
          "id": 12,
          "question": "Who invented Peanut Butter?"
        },
        {
          "answer": "Lake Victoria",
          "category": 3,
          "difficulty": 2,
          "id": 13,
          "question": "What is the largest lake in Africa?"
        },
        {
          "answer": "Agra",
          "category": 3,
          "difficulty": 2,
          "id": 15,
          "question": "The Taj Mahal is located in which Indian city?"
        },
        {
          "answer": "Escher",
          "category": 2,
          "difficulty": 1,
          "id": 16,
          "question": "Which Dutch graphic artist–initials M C was a creator of optical illusions?"
        }
      ],
      "total_questions": 35
    }
    ```

    </details>
    
 

* **Sample Call:**

  ```javascript
    fetch("http://127.0.0.1:5000/questions")
  ```



<a name="delete-question"></a>
### DELETE Questions

* **Description:**
    Used to delete a question by it's id.
    
* **Return:**
    Returns a dict with the value 'success' equals `ture` on success and `false` on failure.

* **URL:**
  `/questions/<question_id>`

* **Method:**
  `DELETE`
  
*  **URL Params:**

   **Optional:**
  None

* **Data Params:**
  None

* **Success Response:**

  * **Code:** 200 <br />
    
    <details>
      <summary>Body (Click to expand)</summary>
      
    ```json
    { "success": true }
    ```

    </details>
    
* **Failure Response:**

  * **Code:** 404 <br />
    
    <details>
      <summary>Body (Click to expand)</summary>
      
    ```json
    {
      "details": "404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.",
      "error": 404,
      "message": "Not found",
      "success": false
    }
    ```

    </details>
    
 

* **Sample Call:**

  ```javascript
    fetch('http://127.0.0.1:5000/questions/30', {method: 'DELETE'})
  ```


<a name="testing"></a>


<a name="create-question"></a>
### Create Questions

* **Description:**
    Used to add new question to the DB.
    
* **Return:**
    Returns a dict with the value 'success' equals `ture` on success and `false` on failure and 'question' holding the added question in case of success.

* **URL:**
  `/questions`

* **Method:**
  `POST`
  
*  **URL Params:**

   **Optional:**
  None

* **Data Params:**
   **Required:**
    1. `question`: The question text.
    2. `answer`: The answer text.
    2. `answer`: The answer text.
    3. `category`: The question category id.
    4. `category`: The question difficulty level.

* **Success Response:**

  * **Code:** 20    0 <br />
    
    <details>
      <summary>Body (Click to expand)</summary>
      
    ```json
    {
      "question": {
        "answer": "sdf",
        "category": 4,
        "difficulty": 2,
        "id": 42,
        "question": "sdf"
      },
      "success": true
    }
    ```

    </details>
    

* **Sample Call:**

  ```javascript
    fetch("http://127.0.0.1:5000/questions", {
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({question: "text q", answer: "test a", category: "4", difficulty: "2"}),
      "method": "POST",
    })
  ```


<a name="testing"></a>








<a name="testing"></a>
## Testing The API
To run the tests, run
```
dropdb trivia_test
createdb trivia_test
psql trivia_test < trivia.psql
python test_flaskr.py
```
The available tests in this project checks that the following are true:
    
1. You are able to get paginated questions using `GET '/questions'`
2. You are able to get questions from specific search term using `POST '/questions/search'`
3. You are able to get questions for quiz from previous_questions array & quiz_category object using `POST '/quizzes'`
4. You are able to create new question and store in the db using  `POST '/questions'`
5. You are able to delete any question by id using  `DELETE '/questions'`
6. You are able to get questions from specific category using `GET '/categories/<int:category_id>/questions'`

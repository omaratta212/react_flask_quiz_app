import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask_cors import CORS
import random

from models import setup_db, Question, Category

QUESTIONS_PER_PAGE = 10


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)

    '''
    @Done: Set up CORS. Allow '*' for origins. Delete the sample route after completing the TODOs
    '''
    CORS(app)

    '''
    @Done: Use the after_request decorator to set Access-Control-Allow
    '''

    @app.after_request
    def after_request_(response):
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
        return response

    '''
    @Done: GET Categories
    Create an endpoint to handle GET requests 
    for all available categories.
    '''

    @app.route('/categories')
    def get_categories():
        categories = {}
        categories_data = Category.query.all()
        for category in categories_data:
            categories[category.id] = category.type

        return jsonify({
            "categories": categories
        })

    '''
    @Done: GET Questions paginated
    Create an endpoint to handle GET requests for questions, 
    including pagination (every 10 questions). 
    This endpoint should return a list of questions, 
    number of total questions, current category, categories. 
  
    TEST: At this point, when you start the application
    you should see questions and categories generated,
    ten questions per page and pagination at the bottom of the screen for three pages.
    Clicking on the page numbers should update the questions. 
    '''

    @app.route('/questions')
    def get_questions():
        # Get page from request if available
        page = request.args.get('page', 1, int)

        # Using SqlAlchemy query pagination to avoid getting all the records from the db
        pagination = Question.query.paginate(page, QUESTIONS_PER_PAGE, error_out=True)

        # Format the questions
        questions = [question.format() for question in pagination.items]

        # Aggregate the categories & format them {<id>: <type>}
        categories = {}
        categories_data = Category.query.all()
        for category in categories_data:
            categories[category.id] = category.type

        # Return the json to client
        return jsonify({
            "total_questions": pagination.total,
            "questions": questions,
            "categories": categories,
            "current_category": categories_data[0].id,
        })

    '''
    @Done: DELETE Questions
    Create an endpoint to DELETE question using a question ID. 
  
    TEST: When you click the trash icon next to a question, the question will be removed.
    This removal will persist in the database and when you refresh the page. 
    '''

    @app.route('/questions/<question_id>', methods=['DELETE'])
    def delete_question(question_id):
        success = False
        question = Question.query.get_or_404(question_id)
        try:
            question.delete()
            success = True
        except Exception as e:
            print(e)

        return jsonify({
            "success": success
        })

    '''
    @Done: POST Questions
    Create an endpoint to POST a new question, 
    which will require the question and answer text, 
    category, and difficulty score.
  
    TEST: When you submit a question on the "Add" tab, 
    the form will clear and the question will appear at the end of the last page
    of the questions list in the "List" tab.  
    '''

    @app.route('/questions', methods=['POST'])
    def create_question():
        success = False

        question = Question(
            request.json.get('question'),
            request.json.get('answer'),
            request.json.get('category'),
            request.json.get('difficulty'),
        )

        try:
            question.insert()
            success = True
        except Exception as e:
            print(e)

        return jsonify({
            "success": success,
            "question": question.format() if success else None
        })

    #  POST Questions search term
    #  ----------------------------------------------------------------
    '''
    @Done: 
    Create a POST endpoint to get questions based on a search term. 
    It should return any questions for whom the search term 
    is a substring of the question. 
  
    TEST: Search by any phrase. The questions list will update to include 
    only question that include that string within their question. 
    Try using the word "title" to start. 
    '''

    @app.route('/questions/search', methods=['POST'])
    def search_questions():
        # Get the search term
        search_term = request.json.get('searchTerm')

        # Query and db and format the response
        questions = Question.query.filter(Question.question.ilike('%' + search_term + '%')).all()
        questions = [question.format() for question in questions]

        return jsonify({
            "success": True,
            "questions": questions,
            "total_questions": len(questions),
            "current_category": questions[0]['category'] if len(questions)>1 else None,
        })

    '''
    @Done: GET Questions based on category
    Create a GET endpoint to get questions based on category. 

    TEST: In the "List" tab / main screen, clicking on one of the 
    categories in the left column will cause only questions of that 
    category to be shown. 
    '''

    @app.route('/categories/<int:category_id>/questions')
    def get_category_questions(category_id):
        questions = Question.query.filter(Question.category == category_id).all()
        questions = [category.format() for category in questions]

        return jsonify({
            "questions": questions,
            'total_questions': len(questions),
            'current_category': category_id
        })

    '''
    @Done: GET Questions to play
    Create a POST endpoint to get questions to play the quiz. 
    This endpoint should take category and previous question parameters 
    and return a random questions within the given category, 
    if provided, and that is not one of the previous questions. 
  
    TEST: In the "Play" tab, after a user selects "All" or a category,
    one question at a time is displayed, the user is allowed to answer
    and shown whether they were correct or not. 
    '''

    @app.route('/quizzes', methods=['POST'])
    def get_quiz_questions():
        # Get the required parameters
        previous_questions = request.json.get('previous_questions', list)
        quiz_category = request.json.get('quiz_category', dict)
        quiz_category = int(quiz_category['id'])

        # Building the query filters
        filters = [Question.id.notin_(previous_questions)]

        # If the category id 0 then it's 'ALL' and we don't need this filter
        if quiz_category != 0:
            filters.append(Question.category == quiz_category)

        # Get the query results with all the filters
        question_query = Question.query \
            .filter(*filters) \
            .order_by(func.random()) \
            .first()

        # Format the result
        question = None
        if question_query:
            question = question_query.format()

        return jsonify({
            "success": True,
            "question": question,
        })

    '''
    @Done: 400 Error handler. 
    '''

    @app.errorhandler(400)
    def bad_request_error(error):
        return jsonify({
            "success": False,
            "error": 400,
            "message": "Baaaad request!",
            "details": error.message
        }), 400

    '''
    @Done: 404 Error handler. 
    '''

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": "Not found",
            "details": str(error)
        }), 404

    '''
    @Done: 422 Error handler. 
    '''

    @app.errorhandler(422)
    def unprocessable_entity_error(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "Unprocessable Entity",
            "details": str(error)
        }), 422

    '''
    @Done: 500 Error handler. 
    '''

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False,
            "error": 500,
            "message": "Internal Server Error",
            "details": str(error)
        }), 500

    return app

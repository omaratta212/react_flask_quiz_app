import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app, QUESTIONS_PER_PAGE
from models import setup_db, Question, Category


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.db_user = "atta"
        self.db_user_password = "passwordforatta"
        self.db_host = "127.0.0.1"
        self.db_port = "5432"
        self.db_name = "trivia_test"
        self.database_path = "postgresql://{}:{}@{}:{}/{}".format(self.db_user, self.db_user_password, self.db_host,
                                                                  self.db_port, self.db_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

    def tearDown(self):
        """Executed after reach test"""
        pass

    # Function that creates test question
    def post_test_question(self):
        question = {
            "question": 'Test question',
            "answer": 'Test answer',
            "difficulty": 1,
            "category": 1
        }
        question_json = json.dumps(question)
        store_response = self.client().post('/questions', data=question_json, content_type='application/json')
        return {
            "question": question,
            "response": store_response
        }

    '''
     Category tests
    '''

    #  Makes sure I get categories
    #  ----------------------------------------------------------------
    def test_get_categories(self):
        res = self.client().get('/categories')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(len(data), 0)
        self.assertNotEqual(data['categories'], None)

    '''
     Question tests
    '''

    #  Makes sure I get Questions & they are paginated
    #  ----------------------------------------------------------------
    def test_get_paginated_questions(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(len(data['questions']), 0)
        self.assertLessEqual(len(data['questions']), QUESTIONS_PER_PAGE)
        self.assertNotEqual(data['total_questions'], None)
        self.assertNotEqual(data['total_questions'], 0)
        self.assertNotEqual(data['categories'], None)
        self.assertNotEqual(len(data['categories']), 0)
        self.assertNotEqual(data['current_category'], None)

    #  Makes sure I get Questions based on category & they are paginated
    #  ----------------------------------------------------------------
    def test_get_questions_for_category(self):
        res = self.client().get('/categories/1/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(data['questions'], None)
        self.assertNotEqual(len(data['questions']), 0)
        self.assertNotEqual(data['total_questions'], None)
        self.assertNotEqual(data['total_questions'], 0)
        self.assertNotEqual(data['current_category'], None)
        self.assertNotEqual(data['total_questions'], 0)

    #  Makes sure I get Game Question provided category and previous question
    #  ----------------------------------------------------------------
    def test_get_question_from_category_and_previous(self):
        body = {
            "previous_questions": [10, 17],
            "quiz_category": {"type": "Geography", "id": 3}
        }

        res = self.client().post('/quizzes', data=json.dumps(body), content_type='application/json')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(data, None)
        self.assertEqual(data['question']['category'], body['quiz_category']['id'])  # Same category
        self.assertNotIn(data['question']['id'], body['previous_questions'])  # Not the same question

    #  Makes sure I can create question
    #  ----------------------------------------------------------------
    def test_post_question(self):
        post = self.post_test_question()
        question = post['question']
        store_response = post['response']
        store_response_json = json.loads(store_response.data)
        store_question = store_response_json['question']

        self.assertEqual(store_response.status_code, 200)
        self.assertNotEqual(store_question['id'], None)
        self.assertEqual(store_question['question'], question['question'])
        self.assertEqual(store_question['answer'], question['answer'])
        self.assertEqual(store_question['difficulty'], question['difficulty'])
        self.assertEqual(store_question['category'], question['category'])

    # Makes sure I can delete question using a question ID
    # ----------------------------------------------------------------
    def test_delete_question(self):
        # Insert new post and get it's id to delete later
        post = self.post_test_question()
        store_response = post['response']
        store_response_json = json.loads(store_response.data)
        store_question = store_response_json['question']

        # Fire delete request with the stored id
        res = self.client().delete('/questions/' + str(store_question['id']))
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)

    # Makes sure I can search for questions
    # ----------------------------------------------------------------
    def test_search_question(self):
        # Insert new post and get it's body to search for latter later
        post = self.post_test_question()
        store_response = post['response']
        store_response_json = json.loads(store_response.data)
        store_question = store_response_json['question']

        body = {"searchTerm": store_question['question']}

        # Fire search request with the stored question body
        res = self.client().post('/questions/search', data=json.dumps(body), content_type='application/json')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['questions'][0]['question'], store_question['question'])


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()

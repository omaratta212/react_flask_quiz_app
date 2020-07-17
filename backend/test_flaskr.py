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
        self.db_name = "trivia"
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
    def test_get_paginated_questions_for_category(self):
        res = self.client().get('/categories/1/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(len(data['questions']), 0)
        self.assertLessEqual(len(data['questions']), QUESTIONS_PER_PAGE)
        self.assertNotEqual(data['total_questions'], None)
        self.assertNotEqual(data['total_questions'], 0)
        self.assertNotEqual(data['current_category'], None)
        self.assertNotEqual(data['total_questions'], 0)


    #  Makes sure I get Questions based on a search term & they are paginated
    #  ----------------------------------------------------------------
    def test_get_paginated_questions_from_search(self):
        res = self.client().get('/questions?search=something')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertLessEqual(len(data['questions']), QUESTIONS_PER_PAGE)
        self.assertNotEqual(data['total_questions'], 0)


    #  Makes sure I get Game Question provided category and previous question
    #  ----------------------------------------------------------------
    def test_get_question_from_category_and_previous(self):
        previous = self.client().get('/questions/1')
        previous_question = json.loads(previous.data)
        res = self.client().get('/questions?category=something&previous=1')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(data, None)
        self.assertNotEqual(data['question']['id'], previous_question['id'])



    #  Makes sure I can create question
    #  ----------------------------------------------------------------
    def test_post_question(self):
        return

    #  Makes sure I can delete question using a question ID
    #  ----------------------------------------------------------------
    def test_delete_question(self):
        return



# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()

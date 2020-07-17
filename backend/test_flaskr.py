import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
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
        self.database_path = "postgresql://{}:{}@{}:{}/{}".format(self.db_user, self.db_user_password, self.db_host, self.db_port, self.db_name)
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

    def test_get_categories(self):
        res = self.client().get('/categories')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(len(data), 0)

    # def test_get_questions_paginated(self):
    #     res = self.client().get('/questions')
    #     data = json.loads(res.data)
    #     self.assertEqual(res.status_code, 200)

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from passlib.hash import pbkdf2_sha256
from flask_cors import CORS
import random

# app configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///health_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'hello'

# CORS configuration
CORS_ALLOW_HEADERS = 'Content-Type'
CORS_RESOURCES = {r'/api/*': {'origins': 'http://localhost:5173'}}

CORS(app, resourses=CORS_RESOURCES)

# create database
db = SQLAlchemy(app)

# Association table to match many-to-many relationship between users and tasks
user_tasks_association = db.Table(
    'user_tasks_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('task_id', db.Integer, db.ForeignKey('task.id')),
    db.Column('completed', db.Boolean, default=False)
)

# Models


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    # establish relationship between user and task
    tasks = db.relationship('Task', secondary=user_tasks_association,
                            backref=db.backref('users', lazy='dynamic'))

    # might store area_of_focus but idk if I need it yet

    def __init__(self, username, phone_number, password):
        self.username = username
        self.phone_number = phone_number
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = pbkdf2_sha256.hash(password)

    def check_password(self, password):
        return pbkdf2_sha256.verify(password, self.password_hash)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, phone_number={self.phone_number}, tasks={self.tasks})>"


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    text = db.Column(db.Text, nullable=False)

    def __init__(self, type, text):
        self.type = type
        self.text = text

    def __repr__(self):
        return f'<Task(id={self.id}, type={self.type}, text={self.text})>'


# create tables
with app.app_context():
    db.create_all()

# method to get random task to send user?

# API Routes


@app.route('/api/user', methods=['GET'])
def get_user():
    if 'user_id' in session:
        user = db.session.get(User, session['user_id'])
        return jsonify({'id': user.id, 'username': user.username, 'phone_number': user.phone_number, 'tasks': [task.id for task in user.tasks]})

    return jsonify({'error': 'User not logged in'}), 401


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    phone_number = data.get('phone_number')
    password = data.get('password')

    new_user = User(username=username,
                    phone_number=phone_number, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'}), 200


@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    if 'user_id' in session:
        user = db.session.get(User, session['user_id'])
        tasks = [{'id': task.id, 'type': task.type, 'text': task.text,
                  'completed': task.completed} for task in user.tasks]

        return jsonify({'tasks': tasks})

    return jsonify({'error': 'User not logged in'}), 401


@app.route('/api/tasks/mark_complete/<int:task_id>', methods=['POST'])
def mark_task_complete(task_id):
    if 'user_id' in session:
        user = db.session.get(User, session['user_id'])
        task = db.session.get(Task, task_id)

        if task and task in user.tasks:
            task_user_association = user_tasks_association.query.filter_by(
                user_id=user.id, task_id=task_id).first()
            task_user_association.completed = True
            db.session.commit()
            return jsonify({'message': f'Task {task_id} marked complete for user {user.id}'}), 200
        else:
            return jsonify({'error': 'Task not found or not owned by user'}), 404

    return jsonify({'error': 'User not logged in'}), 401


@app.route('/api/completed_tasks', methods=['GET'])
def get_completed_tasks():
    if 'user_id' in session:
        user = db.session.get(User, session['user_id'])
        completed_tasks = user_tasks_association.query.filter_by(
            user_id=user.id, completed=True).all()

        task_data = []

        for task_association in completed_tasks:
            task = db.session.get(Task, task_association.task_id)
            task_data.append({
                'id': task.id,
                'type': task.type,
                'text': task.text,
            })

        return jsonify({'completed_tasks': task_data})

    return jsonify({'error': 'User not logged in'}), 401


if __name__ == '__main__':
    app.run(debug=True)

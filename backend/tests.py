from app import app, db, User, Task, UserTasksAssociation
import pytest


@pytest.fixture
def test_client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

# Model tests


def test_create_user():
    user = User('testuser', '123-456-7890', 'testpassword')

    assert user.username == 'testuser'
    assert user.phone_number == '123-456-7890'
    assert user.check_password('testpassword')


def test_check_password():
    user = User('testuser', '123-456-7890', 'testpassword')

    assert user.check_password('testpassword')
    assert not user.check_password('wrong')


def test_set_password():
    user = User('testuser', '123-456-7890', 'testpassword')

    user.set_password("newpassword")

    assert user.check_password('newpassword')


def test_user_repr():
    user = User('testuser', '123-456-7890', 'testpassword')

    assert user.__repr__(
    ) == f'<User(id={user.id}, username=testuser, phone_number=123-456-7890, tasks=[])>'


def test_task_repr():
    task = Task('mental', 'this is a test task')

    assert task.__repr__(
    ) == f'<Task(id={task.id}, type=mental, text=this is a test task)>'

# User route


def test_get_user_authenticated(test_client):
    # Assuming you have a registered user
    user = User(username='testuser', phone_number='1234567890',
                password='testpassword')
    db.session.add(user)
    db.session.commit()

    with test_client.session_transaction() as sess:
        sess['user_id'] = user.id

    response = test_client.get('/api/user')
    data = response.get_json()

    assert response.status_code == 200
    assert data['id'] == user.id
    assert data['username'] == user.username
    assert data['phone_number'] == user.phone_number
    assert data['tasks'] == []


def test_get_user_unauthenticated(test_client):
    response = test_client.get('/api/user')
    data = response.get_json()

    assert response.status_code == 401
    assert data['error'] == 'User not logged in'

# Authentication routes


def test_register_user(test_client):
    data = {
        'username': 'newuser',
        'phone_number': '9876543210',
        'password': 'newpassword'
    }

    response = test_client.post('/api/register', json=data)
    data = response.get_json()

    assert response.status_code == 201
    assert data['message'] == 'User registered successfully'


def test_login_successful(test_client):
    # Assuming you have a registered user
    user = User(username='testuser', phone_number='1234567890',
                password='testpassword')
    db.session.add(user)
    db.session.commit()

    data = {
        'username': 'testuser',
        'password': 'testpassword'
    }

    response = test_client.post('/api/login', json=data)
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == 'Login successful'


def test_login_invalid_credentials(test_client):
    data = {
        'username': 'nonexistentuser',
        'password': 'invalidpassword'
    }

    response = test_client.post('/api/login', json=data)
    data = response.get_json()

    assert response.status_code == 401
    assert data['message'] == 'Invalid credentials'


def test_logout(test_client):
    # Assuming a user is authenticated

    with test_client.session_transaction() as sess:
        sess['user_id'] = 1  # Assuming user ID 1 is authenticated

    response = test_client.post('/api/logout')
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == 'Logout successful'

# Task routes


def test_get_tasks_authenticated(test_client):
    user = User(username='testuser', phone_number='1234567890',
                password='testpassword')
    task1 = Task(type='TestType1', text='TestText1')
    task2 = Task(type='TestType2', text='TestText2')
    user.tasks.extend([task1, task2])
    db.session.add(user)
    db.session.commit()

    with test_client.session_transaction() as sess:
        sess['user_id'] = user.id

    response = test_client.get('/api/tasks')
    data = response.get_json()

    assert response.status_code == 200
    assert 'tasks' in data
    assert len(data['tasks']) == 2


def test_get_tasks_unauthenticated(test_client):
    response = test_client.get('/api/tasks')
    data = response.get_json()

    assert response.status_code == 401
    assert data['error'] == 'User not logged in'


def test_mark_task_complete_authenticated(test_client):
    user = User(username='testuser', phone_number='1234567890',
                password='testpassword')
    task = Task(type='TestType', text='TestText')
    user.tasks.append(task)
    db.session.add(user)
    db.session.commit()

    with test_client.session_transaction() as sess:
        sess['user_id'] = user.id

    response = test_client.post(f'/api/tasks/mark_complete/{task.id}')
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == f'Task {task.id} marked complete for user {user.id}'

    association = UserTasksAssociation.query.filter_by(user_id=user.id, task_id=task.id).first()
    assert association is not None
    assert association.completed is True

def test_mark_task_complete_not_owned(test_client):
    # Assuming you have a registered user without the task
    user = User(username='testuser', phone_number='1234567890',
                password='testpassword')
    task = Task(type='TestType', text='TestText')
    print(user)
    db.session.add_all([user, task])
    db.session.commit()

    with test_client.session_transaction() as sess:
        sess['user_id'] = user.id

    response = test_client.post(f'/api/tasks/mark_complete/{task.id}')
    data = response.get_json()

    assert response.status_code == 404
    assert data['error'] == 'Task not found or not owned by user'


def test_mark_task_complete_unauthenticated(test_client):
    response = test_client.post('/api/tasks/mark_complete/1')
    data = response.get_json()

    assert response.status_code == 401
    assert data['error'] == 'User not logged in'


def test_get_completed_tasks_authenticated(test_client):
    # Assuming you have a registered user with a completed task
    user = User(username='testuser', phone_number='1234567890',
                password='testpassword')
    task = Task(type='TestType', text='TestText')
    user.tasks.append(task)
    db.session.add_all([user, task])
    db.session.commit()

    with test_client.session_transaction() as sess:
        sess['user_id'] = user.id

    response = test_client.post(f'/api/tasks/mark_complete/{task.id}')
    assert response.status_code == 200

    response = test_client.get('/api/completed_tasks')
    data = response.get_json()

    print(f"Response Status Code: {response.status_code}")
    print(f"Response JSON Data: {data}")

    assert response.status_code == 200
    assert 'completed_tasks' in data
    assert len(data['completed_tasks']) == 1


def test_get_completed_tasks_unauthenticated(test_client):
    response = test_client.get('/api/completed_tasks')
    data = response.get_json()

    assert response.status_code == 401
    assert data['error'] == 'User not logged in'

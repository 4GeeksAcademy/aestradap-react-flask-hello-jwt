"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
import uuid

api = Blueprint('api', __name__)



def generate_unique_userId():
    # return str(uuid.uuid4())
    return uuid.uuid4()


# Allow CORS requests to this API
CORS(api)

@api.route('/register', methods=['POST'])
def register_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({'error': 'An email and password are required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'The email is already in use'}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({'message': 'Successfully registered user'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to register user: {str(e)}'}), 500
    

@api.route('/log-ins', methods=['POST'])
def handle_logins():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email is None or password is None:
        return jsonify({'msg': 'No email or password'}), 400
    
    user = User.query.filter_by( email = email ).one_or_none()

    if user is None:
        return jsonify({'msg': "No such user"}), 404
   
    if user.password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token( identity = user.id )
    return jsonify( access_token = access_token ), 201



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private_data():
    userId = get_jwt_identity()
    user = User.query.get(userId)
    message = f"This data comes from the DB with a required token and it's a private route. You are using {user.email} and have id: {user.id}"
    return jsonify(message=message), 200
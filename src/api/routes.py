"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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
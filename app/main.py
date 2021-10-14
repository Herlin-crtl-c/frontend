from logging import exception
import os, requests

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv



# Load variables from .env
load_dotenv()
print(os.environ.get('HELLO'))

# Create Flask instance
app = Flask(__name__)
app.config['JSON_AS_ASCII']=False

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(80), unique=True, nullable=False)
    updated_at = db.Column(db.DateTime(), default=db.func.now(), onupdate=db.func.now())

class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(80), unique=True, nullable=False)
    stugID = db.Column(db.String(120), unique=True, nullable=False)
    date = db.Column(db.DateTime(), default=db.func.now())


#notes_token = os.environ.get('NOTES_TOKEN')

try:
    url = 'https://limitless-atoll-37666.herokuapp.com/users/login' #os.environ.get('CABINS_URL')
    header = { 'Content-Type': 'application/json' }
    body = {"email": "Janne@doe.com", "password": os.environ.get('NOTES_PASSWORD')}

    response = requests.post(url, headers=header, json=body)

    notes_token = response.content.decode('utf-8')

    
except exception as e :
    print(e)
   

# Default route to /




@app.route("/services")
def service():
    ret= []
    for u in Service.query.all():
        ret.append({'service': u.service, 'updated at': u.updated_at})

    return jsonify(ret)


@app.route("/orders", methods = ['GET','POST', 'PUT'])
def order():
    ret= []
    if request.method == 'GET':

        for u in Orders.query.all():
            ret.append({'Service': u.service, 'Stug ID': u.stugID, 'Date': u.date})

    if request.method == 'POST':
        body = request.get_json()

        new_service = Orders(service=body['service'], stugID = body['stugID'], date=body['Date'])
        db.session.add(new_service)
        db.session.commit()

        ret = [ "Added service" ]

    if request.method == 'PUT':
        ret = ["PUT"]

    



    return jsonify(ret)


@app.route("/cabins")
def cabins():
    url = 'https://limitless-atoll-37666.herokuapp.com/cabins' #os.environ.get('CABINS_URL')
    header = { 'Authorization': 'Bearer {}'.format(notes_token) }
    
    response = requests.get(url, headers=header)
    return jsonify(response.json())

# Run app if called directly
if __name__ == "__main__":
        app.run()    
from flask import Flask, request, send_from_directory
from flask.json import jsonify
from tinydb import TinyDB, Query
import os
from flask_cors import CORS
from Deck import Deck

# Prepare the app and configurations
app = Flask(__name__)
CORS(app)

# Setup the document DB
db = TinyDB('db.json')
deck = db.table('deck')

# Setup the static file directory
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), './wwwroot')

@app.after_request
def add_header(response):
    response.cache_control.max_age = 86400
    del response.headers['Server']
    return response

@app.route('/', methods=['GET'])
def serve_dir_directory_index():
	''' Serves the static index file '''
	return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_file_in_dir(path):
	''' Serves the wwwroot files '''
	
	if not os.path.isfile(os.path.join(static_file_dir, path)) and not os.path.isfile(os.path.join(static_file_dir, path, 'index.html')):
		path = os.path.join(path, 'index.html')

	# Fallback to browser routing
	if not os.path.isfile(os.path.join(static_file_dir, path)):
		path = 'index.html'

	return send_from_directory(static_file_dir, path)

@app.route('/api/deck', methods=['GET'])
def getAll():
	''' Get all the decks '''
	results = deck.all()
	# Add the IDs from the query
	for result in results:
		result['id'] = result.doc_id

	return jsonify(results)

@app.route('/api/deck/<deckid>', methods=['GET'])
def getDeck(deckid=None):
	''' Get a deck by id '''
	if deckid is not None:
		deck_result = deck.get(doc_id=int(deckid))
		deck_result['id'] = deck_result.doc_id
		return jsonify(deck_result)
	else:
		return jsonify({})

@app.route('/api/deck', methods=['POST'])
def createDeck():
	''' Create deck '''
	body = request.json
	inserted_id = deck.insert(body)
	body['id'] = inserted_id
	return jsonify(body), 200

@app.route('/api/deck/<deckid>', methods=['PATCH'])
def updateDeck(deckid=None):
	''' Update deck '''
	if deckid is not None:
		body = request.json
		deck.update(body, doc_ids=[int(deckid)])
		return jsonify(body), 200
	else:
		return jsonify({})

@app.route('/api/deck/<deckid>', methods=['DELETE'])
def deleteDeck(deckid=None):
	''' Delete deck '''
	if deckid is not None:
		deck.remove(doc_ids=[int(deckid)])
		return jsonify({}), 204
	else:
		return jsonify({})
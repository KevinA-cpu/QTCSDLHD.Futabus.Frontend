from flask import Flask, jsonify, request, json
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
client = MongoClient("localhost", 27017)
db = client.HoaDon
collection = db.HoaDon

@app.errorhandler(400)
def handle_400_error(e):
    raise Exception("Unhandled Exception")

@app.errorhandler(500)
def handle_500_error(e):
    raise Exception("Unhandled Exception")

@app.route('/validation', methods=['POST'])
def validate_ticket():
    msg = request.json
    query_key = msg.get('query_key')
    
    if not query_key:
        return jsonify({'success': False, 'error': 'query_key is required'}), 400
    
    ticket = collection.find_one({"query_key": query_key},{'_id': False})
    
    if not ticket:
        return jsonify({'success': False, 'error': 'ticket not found'}), 404
    return jsonify({'success': True, 'data': ticket}), 200

@app.route('/info/<int:query_key>', methods=['GET'])
def show_ticket_detail(query_key):
    ticket = collection.find_one({"query_key": str(query_key)},{'_id': False})
    if not ticket:
        return jsonify({'success': False, 'error': 'some error happened'}), 500
    return jsonify(ticket)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, debug=True)
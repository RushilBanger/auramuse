from flask import Flask, jsonify, send_from_directory, render_template
from get_songs_json import get_albums_data, get_songs_in_album
import os

app = Flask(__name__, static_folder='static', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/api/albums')
def albums():
    data = get_albums_data()
    return jsonify(data)

@app.route('/api/songs/<album>')
def songs(album):
    songs = get_songs_in_album(album)
    return jsonify(songs)

if __name__ == "__main__":
    app.run(debug=True)

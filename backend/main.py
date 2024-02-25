from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return 'Home!'


@app.route('/shows', methods=['GET'])
def show():
    from imdb import ImdbShow
    shows = ImdbShow.search_for_shows('Breaking Bad')
    return jsonify(shows), 200


app.run()

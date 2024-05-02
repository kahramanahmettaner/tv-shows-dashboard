from flask import Flask, jsonify, request
from imdb import ImdbShow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes in the Flask app


@app.route('/', methods=['GET'])
def home():
    return 'Home!'


@app.route('/shows', methods=['GET'])
def shows_by_title():
    show_name = request.args.get('show_name')
    if show_name is None:
        return jsonify({"message": "show_name parameter is missing"}), 400

    try:
        query_results = ImdbShow.search_for_shows(show_name)
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    if query_results is None:
        return jsonify({"message": "An error occurred while searching for shows"}), 500

    if not query_results:
        return jsonify({"message": "No shows found for the provided show_name"}), 404

    # If everything is successful, return the query_results
    return jsonify(query_results), 200


@app.route('/show-details', methods=['GET'])
def get_show_details():
    imdb_id = request.args.get('imdb_id')
    if not imdb_id:
        return jsonify({"message": "imdb_id parameter is missing"}), 400

    try:
        show = ImdbShow(imdb_id)
        show.fetch_show_data()
        show_details = {
            "imdb_id": show.imdb_id,
            "show_name": show.show_name,
            "seasons_count": show.seasons_count
        }
        return jsonify(show_details), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/season-details', methods=['GET'])
def get_season_details():
    imdb_id = request.args.get('imdb_id')
    season_number = request.args.get('season_number')
    if not imdb_id or not season_number:
        return jsonify({"message": "imdb_id or season_number parameter is missing"}), 400

    try:
        show = ImdbShow(imdb_id)
        season_data = show.fetch_season_data(int(season_number))
        return jsonify(season_data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/show-credits', methods=['GET'])
def get_show_credits():
    imdb_id = request.args.get('imdb_id')
    if not imdb_id:
        return jsonify({"message": "imdb_id parameter is missing"}), 400

    try:
        show = ImdbShow(imdb_id)
        show_credits = show.fetch_credits()
        return jsonify(show_credits), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


app.run()

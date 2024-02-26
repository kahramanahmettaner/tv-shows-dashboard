from flask import Flask, jsonify, request
from imdb import ImdbShow

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return 'Home!'


@app.route('/shows', methods=['GET'])
def shows_by_title():
    show_name = request.args.get('show_name')
    if show_name is None:
        return jsonify({"error": "show_name parameter is missing"}), 400

    try:
        query_results = ImdbShow.search_for_shows(show_name)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    if query_results is None:
        return jsonify({"error": "An error occurred while searching for shows"}), 500

    if not query_results:
        return jsonify({"message": "No shows found for the provided show_name"}), 404

    # If everything is successful, return the query_results
    return jsonify(query_results), 200


app.run()

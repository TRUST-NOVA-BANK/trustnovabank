from flask import Flask, request, jsonify
from register import register_user
from login import login_user
from dashboard import get_dashboard
@app.route("/dashboard/<int:user_id>")
def dashboard(user_id):

    result = get_dashboard(user_id)

    return jsonify(result)

@app.route("/login", methods=["POST"])
def login():

    data = request.json


    result = login_user(

        data["email"],

        data["password"]

    )


    return jsonify(result)

app = Flask(__name__)


@app.route("/register", methods=["POST"])
def register():

    data = request.json

    result = register_user(
        data["full_name"],
        data["email"],
        data["phone"],
        data["password"]
    )

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
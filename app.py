from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__, template_folder="templates")

# HOME PAGE
@app.route("/")
def home():
    return render_template("index.html")


# TRAFFIC DATA API
@app.route("/traffic-data")
def traffic_data():

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT vehicles,signals,emergency,roads FROM traffic LIMIT 1")
    data = cursor.fetchone()

    conn.close()

    if data:
        return jsonify({
            "vehicles": data[0],
            "signals": data[1],
            "emergency": data[2],
            "roads": data[3]
        })
    else:
        return jsonify({
            "vehicles": 0,
            "signals": 0,
            "emergency": 0,
            "roads": 0
        })


# SEARCH AREA
@app.route("/search", methods=["POST"])
def search():

    data = request.get_json()
    area = data.get("area")

    traffic = {
        "Delhi":{"vehicles":1200,"signals":65,"emergency":8,"roads":14},
        "Mumbai":{"vehicles":900,"signals":50,"emergency":5,"roads":10},
        "London":{"vehicles":1500,"signals":80,"emergency":12,"roads":20},
        "New York":{"vehicles":2000,"signals":90,"emergency":15,"roads":25}
    }

    if area in traffic:
        return jsonify(traffic[area])

    return jsonify({"error":"Area not found"})


# CONTACT FORM
@app.route("/contact", methods=["POST"])
def contact():

    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO contact(name,email,message) VALUES(?,?,?)",
        (name,email,message)
    )

    conn.commit()
    conn.close()

    return "Message Saved"


if __name__ == "__main__":
    app.run(debug=True)
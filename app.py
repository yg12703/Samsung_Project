from flask import Flask, render_template, request, jsonify
from flask import Flask, render_template, request, redirect, session, url_for
import sqlite3

app = Flask(__name__, template_folder="templates")
app.secret_key = "smarttrafficsecret"

# HOME PAGE
@app.route("/")
def home():
    return render_template("index.html")

# Admin Login Route
@app.route("/admin-login", methods=["GET","POST"])
def admin_login():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        if username == "admin" and password == "admin123":

            session["admin"] = True
            return redirect("/graph-dashboard")

        else:
            return "Invalid Login"

    return render_template("login.html")

# Add Logout
@app.route("/logout")
def logout():

    session.pop("admin", None)

    return redirect("/")

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

@app.route("/traffic-chart", methods=["POST"])
def traffic_chart():

    data = request.get_json()
    city = data.get("city")

    chart_data = {

        "Delhi": [40,120,90,110,150,130],

        "Mumbai": [60,140,100,120,160,150],

        "Bangalore": [50,110,80,100,140,120],

        "London": [30,70,60,80,90,85]

    }

    values = chart_data.get(city, [20,40,30,35,50,45])

    return jsonify({
        "labels":["6AM","9AM","12PM","3PM","6PM","9PM"],
        "values": values
    })
# dashboard
@app.route("/graph-dashboard")
def graph_dashboard():
    return render_template("traffic_dashboard.html")

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

@app.route("/learnMore")
def learnMore():
    return render_template("learnMore.html")

if __name__ == "__main__":
    app.run(debug=True)
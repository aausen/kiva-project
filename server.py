from flask import Flask, render_template, redirect, request, session
from jinja2 import StrictUndefined
import requests
import os


app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"]
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def show_homepage():
    return render_template("index.html")






if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True)
from flask import Flask, render_template, redirect, request, session
from jinja2 import StrictUndefined
import requests
import os


app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"]
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def show_homepage():
    """Displays homepage."""
    
    return render_template("index.html")

@app.route("/more/<loanId>")
def show_more_info(loanId):
    """Displays more information page."""
    loan_id = loanId
    loan_here = f"https://www.kiva.org/lend-beta/{loanId}"
    return render_template("more-info.html", loan_id=loan_id, loan_here=loan_here)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True)
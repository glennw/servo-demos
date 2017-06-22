import json
from flask import Flask, render_template

app = Flask(__name__)


def enum_demos():
    with open('demos.json') as demos_file:
        demos_data = json.load(demos_file)
    return demos_data


@app.route("/")
def index():
    demos = enum_demos()
    return render_template('index.html', demos=demos)

@app.route('/demos/<string:name>')
def demo(name):
    demos = enum_demos()
    demo = demos[name]
    return render_template('demo.html', test_name=name, demo=demo)

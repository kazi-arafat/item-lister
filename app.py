from flask import Flask, request, render_template
from pymongo import MongoClient
from dbconfig.mongoconfig import mongoUri


# Initialize App
app = Flask(__name__)

@app.route('/')
def Index(methods=['GET','POST']):
    if (request.method == "POST"):
        pass
    client = MongoClient(mongoUri)
    with client:
        db = client['item-lister']
        data = db.items.find({})
        print(data)
    return render_template('index.html')


# Running App
if (__name__ == "__main__"):
    app.debug = True
    app.run()
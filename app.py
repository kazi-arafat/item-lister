from flask import Flask, request, render_template, url_for, redirect
from pymongo import MongoClient
from dbconfig.mongoconfig import mongoUri
import json
from datetime import datetime as dt


# Initialize App
app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def Index():
    client = MongoClient(mongoUri)
    if (request.method == 'POST'):
        # item = request.form.get('item')
        item = request.form['item']
        # app.logger.info(item)
        # print(item)
        with client:
            db = client['item-lister']
            db.items.insert_one({'item_name' : item,'create_date' : str(dt.now())})
            data = db.items.find({})
            data_list = []
            for row in data:
                row.pop('_id')
                data_list.append(row)
        print(data_list)
        return url_for("Index",items = data_list),201
    
    with client:
        db = client['item-lister']
        data = db.items.find({})
        # print(data)
        data_list = []
        for row in data:
            row.pop('_id')
            # app.logger.info(row)
            data_list.append(row)
    # allItems_json = json.dumps(data_list)
    # print(data_list)
    return render_template('index.html', items = data_list)


# Running App
if (__name__ == "__main__"):
    app.debug = True
    app.run()
from flask import Flask, request, render_template, url_for
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
        item = request.form.get('item')
        # app.logger.info(item)
        print(item)
        with client:
            db = client['item-lister']
            db.items.insert_one({'item_name' : item,'create_date' : str(dt.now())})
        return render_template('index.html'),201
    
    with client:
        db = client['item-lister']
        data = db.items.find({})
        # print(data)
        data_list = []
        for row in data:
            row.pop('_id')
            # app.logger.info(row)
            data_list.append(row)
    allItems_json = json.dumps(data_list)
    return render_template('index.html',items=allItems_json)


# Running App
if (__name__ == "__main__"):
    app.debug = True
    app.run()
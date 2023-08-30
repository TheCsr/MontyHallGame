from flask import Flask, request, jsonify
import random
from flask_cors import CORS
from pymongo import MongoClient
import config

app = Flask(__name__)

client = MongoClient(config.MONGO_URI)
db = client[config.DB_NAME]

CORS(app)

def get_user_collection_data():
    collection = db['user']
    return collection.find()

@app.route('/')
def index():
    try:
        user_data = get_user_collection_data()
        data_str = "<br>".join(str(user) for user in user_data)
        return f"MongoDB Atlas connection successful!<br>User Collection Data:<br>{data_str}"
    except Exception as e:
        return f"Connection failed: {e}"
    


@app.route('/insert' , methods=['POST'])
def insert_data():
    body = request.get_json()
    data = {
        'name' : body['name'],
        'won' : body['won'],
        'loss': body['loss']
    }
    try:
        collection = db['user']
        collection.insert_one(data)
        return "1"
    except Exception as e:
        return "0"
    
@app.route('/fetch' , methods=['GET'])
def fetch_data():
    try:
        collection = db['user']
        data = list(collection.find({}))
        ser_data = []
        for document in data:
            document['_id']= str(document['_id'])
            ser_data.append(document)

        return jsonify(ser_data)
    except Exception as e:
        return f"Connection Failed: {e}"

@app.route('/monty_hall', methods=['POST'])
def monty_hall():
    # parse the body request to get the arguments value
    body = request.get_json()
    simulations = body['sim']
    change_door = body['change']
    name = body['name']
    
    num_simulations = int(simulations)
    
    wins_change = 0
    losses_change = 0
    wins_no_change = 0
    losses_no_change = 0
    
    # simulations
    for i in range(num_simulations):
        # assign the door randomly bu shuffling it
        doors = ['car', 'goat', 'goat']
        random.shuffle(doors)
        
        # player chooses a random door
        player_choice = random.randint(0, 2)
        
        # host opens a door that does not have a car
        for j in range(3):
            if j != player_choice and doors[j] == 'goat':
                host_choice = j
                break
        
        # player changes the door
        if change_door:
            for j in range(3):
                if j != player_choice and j != host_choice:
                    player_choice = j
                    break
        
        # result
        if doors[player_choice] == 'car':
            if change_door:
                wins_change += 1
            else:
                wins_no_change += 1
        else:
            if change_door:
                losses_change += 1
            else:
                losses_no_change += 1
    
    # probabilities
    prob_win_change = wins_change / num_simulations
    prob_loss_change = losses_change / num_simulations
    prob_win_no_change = wins_no_change / num_simulations
    prob_loss_no_change = losses_no_change / num_simulations

    try:
        data = {
        'name' : name,
        'won' : wins_change,
        'loss': losses_change
        }
        collection = db['user']
        collection.insert_one(data)

        if(change_door):
            return jsonify({
                'wins': wins_change,
                'losses': losses_change,
                'prob_win': prob_win_change,
                'prob_loss': prob_loss_change,
            })
        else:
            return jsonify({
                'wins': wins_no_change,
                'losses': losses_no_change,
                'prob_win': prob_win_no_change,
                'prob_loss': prob_loss_no_change  
            })
    except Exception as e:
        return "0"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port='80')

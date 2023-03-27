from flask import Flask, request, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/monty_hall', methods=['POST'])
def monty_hall():
    # parse the body request to get the arguments value
    body = request.get_json()
    simulations = body['sim']
    change_door = body['change']
    
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
    
    # results
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

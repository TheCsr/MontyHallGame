export function getScore(noOfSim, change, name) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "sim":noOfSim,
        "change": change,
        "name": name
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: raw,
    };
    return (dispatch) => {
        return fetch("/monty_hall", requestOptions).then((response) => response.json()).then((result) =>
        dispatch({
            type:"get_score",
            data: result,
            loading: false,
        }))
    }
}

export function getStatus() {
    return {
        type: 'get_status',
    };
}

export function getResult() {
    const requestOptions = {
        method:'GET',
        redirect: 'follow',
    };
    return (dispatch) => {
        return fetch('/fetch', requestOptions).then((response) => response.json()).then((result) =>
        dispatch({
            type: "get_result",
            data:result,
            loading:false,
        })).catch(error => console.log('error',error))
    }
}

export function postResult(name, won, loss) {
    var myHeaders= new Headers();
    myHeaders.append('Content-Type', "application/json");
    var raw = JSON.stringify({
        "name" : "testing",
        "won" : "10",
        "loss": "20"
    });

    const requestOptions = {
        method:'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: raw,
    };

    return (dispatch) => {
        return fetch('/insert', requestOptions).then((response) => response.json()).then((result) =>
        dispatch({
            type: "post_result",
            data:result,
            loading:false,
        })).catch(error => console.log('error',error))
    }
}
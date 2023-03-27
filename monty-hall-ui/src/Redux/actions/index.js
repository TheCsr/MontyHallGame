export function getScore(noOfSim, change) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "sim":noOfSim,
        "change": change
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: raw,
    };
    console.log("raw",raw);
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
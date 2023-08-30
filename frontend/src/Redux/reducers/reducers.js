export const createScoreReducer = (state = {loading: false, data: {}}, action) => {
    if (action.type === "get_score") {
        return {
            ...state,
            data: action.data,
            loading:action.loading
        }
    } else if(action.type === "get_status") {
        return {
            ...state,
            loading:true
        }
    }
     else {
        return {
            ...state
        }
    }
}

export const postResultReducer = (state = {loading: false, data: {}}, action) => {
    if (action.type === "post_result") {
        return {
            ...state,
            data: action.data,
            loading:action.loading
        }
    } else if(action.type === "get_status") {
        return {
            ...state,
            loading:true
        }
    }
     else {
        return {
            ...state
        }
    }
}

export const getResultReducer = (state = {loading: false, data: [{}]}, action) => {
    if (action.type === "get_result") {
        return {
            ...state,
            data: action.data,
            loading:action.loading
        }
    } else if(action.type === "get_status") {
        return {
            ...state,
            loading:true
        }
    }
     else {
        return {
            ...state
        }
    }
}
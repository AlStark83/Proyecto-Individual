import axios from 'axios';


export function getVideogames(){
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/videogames',{});
        return dispatch({ type: 'GET_VIDEOGAMES', payload: json.data
        })
    }
}
export function getGenres(){
    return async function(dispatch) {
        var info = await axios.get('http://localhost:3001/genres',{});
        return dispatch({ type: 'GET_GENRES', payload: info.data
        })
    }
}

export function postVideogame (payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/videogames', payload);
        console.log(response);
        return response;        
    }
}

export function filterVideogamesByCreatedInDB(payload) {
    console.log(payload)
    return { type: 'FILTER_BY_CREATEDINDB', payload: payload
    }
}

export function orderByName(payload) {
    return{ type: 'ORDER_BY_NAME', payload
    }
}

export function getNameVideogame(name){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogames?name='+ name);
            return dispatch({ type : 'GET_NAME_VIDEOGAMES', payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogames/'+id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
            
        }catch (error){
            console.log(error);
        }
    }
}
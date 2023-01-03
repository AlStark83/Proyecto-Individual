
const initialState = {
    videogames : [],
    allVideogames: [],
    genres:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames:action.payload,
                allVideogames:action.payload
            }
        case 'GET_GENRES':
            return{
                ...state, 
                genres: action.payload
            }
        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }
        case 'POST_VIDEOGAME':
            return {
                ...state,
            }
        case 'FILTER_BY_CREATEDINDB':
            const allVideogames = state.allVideogames
            const createdFilter = action.payload ==='true' ?  allVideogames.filter(el => el.createdInDb) : allVideogames.filter(el => !el.createdInDb)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }
            
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.videogames.sort(function (a,b){
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort(function (a,b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                videogames: sortedArr
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
        }
        default: 
        return state;
        };
}
export default rootReducer;
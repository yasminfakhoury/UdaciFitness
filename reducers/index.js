import { RECIEVE_ENTRIES, ADD_ENTRY } from '../actions';

// state will be one big object where each of the keys stand for a specific day and each value represents
// the metrics for a specific day
export default function entriesReducer(state={}, action){
    switch (action.type) {
        // get object with all the entries copied onto it
        case RECIEVE_ENTRIES :
            return {
                ...state,
                ...action.entries
            }
        case ADD_ENTRY :
            return {
                ...state,
                ...action.entry
            }
        default : 
            return state
    }
}
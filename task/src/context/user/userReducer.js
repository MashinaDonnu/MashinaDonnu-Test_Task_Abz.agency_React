import {ADD_USER, LOAD_MORE_USERS, LOAD_USERS} from "./actionTypes";

export const userReducer = (state, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            return {...state, ...action.payload}
        }
        case LOAD_MORE_USERS: {
            return {...state, users: [...state.users, ...action.payload.users], url: action.payload.url}
        }
        case ADD_USER: {
            return {...state, users: [action.payload, ...state.users.slice(0, 5)]}
        }
        default: return state
    }
}
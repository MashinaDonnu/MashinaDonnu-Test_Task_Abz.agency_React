import React from 'react'
import {UserContext} from "./userContext";
import {userReducer} from "./userReducer";
import {useCallback, useEffect, useReducer} from "react";
import {LOAD_USERS} from "./actionTypes";
import {useFetch} from "../../hooks/useFetch";

export const UserState = ({children}) => {
    const windowSize = document.documentElement.clientWidth
    const userCount = windowSize > 450 ? '6' : '3'
    const initialState = {
        users: [],
        url: `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${userCount}`
    }
    const [state, dispatch] = useReducer(userReducer, initialState)
    const {request, loading} = useFetch()
    const fetchUsers = useCallback(async () => {
        try {
            const data = await request(state.url, 'GET')
            dispatch({type: LOAD_USERS, payload: {users: data.users, url: data.links.next_url}})
        } catch (e) {
            console.log(e)
        }
    }, [request, state.url])
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <UserContext.Provider value={{state, dispatch, loading, request}}>
            {children}
        </UserContext.Provider>
    )
}

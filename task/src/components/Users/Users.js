import React, {useContext, useState} from 'react';
import {UsersList} from "../UsersList/UsersList";
import {Loader} from "../Loader/Loader";
import {LOAD_MORE_USERS} from "../../context/user/actionTypes";
import {UserContext} from "../../context/user/userContext";
import './Users.scss'

export const Users = () => {
    const [btnVisible, setBtnVisible] = useState(true);
    const {state, request, loading, dispatch} = useContext(UserContext)
   const loadUsers = async () => {
       const load = await request(state.url, 'GET')
       if (!load.success || !load.links.next_url) {
           setBtnVisible(false)
           return
       }
       dispatch({type: LOAD_MORE_USERS, payload: {
               users: load.users,
               url: load.links.next_url
           }})
    }
    return (
        <section className="users">
            <div className="container">
                <div className="users-head">
                    <h1>Our cheerful users</h1>
                    <p>Attention! Sorting users by registration date</p>
                </div>
                {loading && !state.users.length ?  <Loader/> : <UsersList users = {state.users}/>}

                {btnVisible ? <button className="btn-show-more btn" onClick={loadUsers}>Show more</button> : null}
            </div>
        </section>
    )
}

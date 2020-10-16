import React from 'react'
import {UserCard} from "../UserCard/UserCard"
import './UsersList.scss'

export const UsersList = ({users}) => {
    const sortUsersByDate = () => {
        return users.filter(user => user !== undefined).sort((a, b) => b.registration_timestamp - a.registration_timestamp)
    }
    return (
        <div className="users-list d-flex flex-wrap justify-content-between">
            {sortUsersByDate().map((user, index) => {
                return <UserCard key={index} user={user} />
            })}
        </div>
    )
}

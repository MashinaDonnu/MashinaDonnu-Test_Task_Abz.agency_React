import React, {useEffect, useRef, useState} from 'react';
import Tippy from '@tippyjs/react'
import './UserCard.scss'

const isSlice = (str, size) => {
    if (!str.includes(' ') && str.length > size) {
        str = str.slice(0, size) + '...'
    }
    return str
}

export const UserCard = ({user}) => {
    const pName = useRef(null)
    const [padding, setPadding] = useState('21px')
    useEffect(() => {
        if(pName.current.clientWidth > 170){
            setPadding('17px')
        }
    }, [])
    if(!user) {
        return 'No user'
    }
    return (
        <div className="card-wrap">
            <div className="user-card">
                <div className="card-info">
                <img src={user.photo}  alt="user"/>
                    <Tippy placement='top' arrow={false} delay={700} content={<div className="react-tooltip"><span>{user.name}</span></div>}>
                        <h4 className="name" style={{paddingBottom:padding}} ref={pName}>{isSlice(user.name, 15)}</h4>
                    </Tippy>
                    <Tippy placement='bottom' arrow={false} delay={700} content={<div className="react-tooltip"><span>{user.email}</span></div>}>
                        <p className="specialty">{user.position}</p>
                    </Tippy>
                    {/*<div style={{paddingBottom:'20px'}}></div>*/}
                    <Tippy placement='bottom' arrow={false} delay={700} content={<div className="react-tooltip"><span>{user.email}</span></div>}>
                        <p className="email">{isSlice(user.email, 20)}</p>
                    </Tippy>
                        <p className="phone">{user.phone}</p>
                </div>
            </div>
        </div>
    )
}

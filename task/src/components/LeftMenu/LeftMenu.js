import React from 'react'
import './LeftMenu.scss'
import logo from '../../assets/logo.svg'

export const LeftMenu = props => {
    const links = [
        [
            {text: 'About me'},
            {text: 'Relationships'},
            {text: 'Users'},
            {text: 'Sign Up'},
            {text: 'Terms and Conditions'},
        ],
        [
            {text: 'How it works'},
            {text: 'Partnership'},
            {text: 'Help'},
            {text: 'Leave testimonial'},
            {text: 'Contact us'},
        ],
        [
            {text: 'Articles'},
            {text: 'Our news'},
            {text: 'Testimonials'},
            {text: 'Licenses'},
            {text: 'Privacy Policy'},
        ]
    ]
    return (
        <>
        <div className={`opacity-bg ${props.open ? 'open' : ''}`} onClick={props.closeMenu} />
            <div className={`left-menu ${props.open ? 'open' : ''}`}>
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                {links.map((block, index) => {
                    return <div className="left-menu-block" key={index}>
                        <ul>
                            {block.map((link, index) => {
                                return <li key={index}>
                                    <a
                                        href="/#register"
                                        data-id={index}
                                        // onClick={props.closeMenu} // Закрывать меню после нажатия на ссылку
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            })}
                        </ul>
                    </div>
                })}
            </div>
        </>
    )
}

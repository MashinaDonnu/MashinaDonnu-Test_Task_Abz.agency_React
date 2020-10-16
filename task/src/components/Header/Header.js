import './Header.scss'
import React from 'react'

export const Header = () => {
    const windowSize = document.documentElement.clientWidth
    const islittleText = windowSize < 550
    return (
        <header className="header">
            <div className="header-bg-image">
                <div className="header-content">
                    <div className="container">
                        <div className="header-text">
                            <h1>Test assignment<br/> for Frontend <br/> Developer position</h1>
                            <p style={{textAlign: (islittleText ? 'center' : 'left')}}>
                                We kindly remind you that your test assignment should be submitted as a link to
                                github/bitbucket repository.

                                {!islittleText ?
                                    <span>
                                        Please be patient, we consider and respond to every application that meets minimum
                                        requirements.
                                        We look forward to your submission. Good luck! The photo has to scale in the banner area
                                        on the different screens
                                    </span>
                                    : null
                                }
                            </p>
                            <a className="btn" href="/#register">Sign up now</a>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

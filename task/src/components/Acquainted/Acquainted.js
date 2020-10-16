import React from 'react';
import './Acquainted.scss'
import acquaintedImg from '../../assets/man-laptop-v1.svg'
export const Acquainted = () => {
    return (
        <section className="acquainted">
            <div className="container">
                <h1 className="acquainted-title">Let's get acquainted</h1>
                <div className="row acquainted-content justify-content-between">
                    {/*<div className="acquainted-content d-flex justify-content-around">*/}
                        <div className="acquainted-img col-md-5 col-sm-4">
                            <img src={acquaintedImg} alt="acquainted"></img>
                        </div>
                        <div className="acquainted-text col-md-7 col-sm-8">
                            {/*<div className="container">*/}
                                <h4>I am cool frontend developer</h4>
                                <p>We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.</p>
                                <p>If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.</p>
                                <a href="#register" className="acquainted-btn-sing-up">
                                    Sing up now
                                </a>
                            {/*</div>*/}
                        </div>
                    {/*</div>*/}
                </div>

            </div>

        </section>
    )
}

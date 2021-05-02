import React, {Component} from 'react';

import './layout.scss';

class Footer extends Component{

    render() {
        return (
            <div className="footer">
                <div className={'footer-container'}>
                    <div className={`footer-max`}>
                        <a href='https://www.reddit.com/user/Yhanl' target={`_blank`}>
                            <i className="fab fa-reddit fa-2x"></i>
                        </a>
                        {/*{ pageContent.linkedin ?*/}
                        {/*    <a href={pageContent.linkedin} target={`_blank`}>*/}
                        {/*        <i className="fab fa-linkedin-in fa-2x"></i></a> : ""*/}
                        {/*}*/}
                        {/*{ pageContent.facebook ?*/}
                        {/*    <a href={pageContent.facebook} target={`_blank`}>*/}
                        {/*        <i className="fab fa-facebook-f fa-2x"></i></a> : ""*/}
                        {/*}*/}
                        {/*{ pageContent.git ?*/}
                        {/*    <a href={pageContent.git} target={`_blank`}>*/}
                        {/*        <i className="fab fa-github fa-2x"></i></a> : ""*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
            )
    }
}

export default Footer;



import React from 'react'
import {Link} from 'react-router-dom'

class NotFound extends React.Component {
    render() {
        return (
            <div className="box">
                <h1 className="center">404</h1>
                <h3 className="center margin-bottom-large">The page/question you requested does not exist.</h3>
                <Link to="/" className='center'>Home</Link>
            </div>
        )
    }
}

export default NotFound
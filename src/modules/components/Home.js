import React from 'react'
import {withRouter} from 'react-router'

class Home extends React.Component {
    render() {
        this.props.router.push("/");
        return (
            <div></div>
        )
    }
}

export default withRouter(Home);
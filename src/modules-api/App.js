import React from 'react';
import '../App.css';
import {Row, Col, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors : []
        };

        this.getMenu = this.getMenu.bind(this);

        this.getMenu();
    }

    getMenu() {
        let myHeaders = new Headers();

        fetch("http://localhost:8008/v1/sensors",
            {   method: 'GET',
                mode: 'cors',
                headers: myHeaders,
                cache: 'default'
            })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                this.setState({sensors : JSON.parse(response)});
            }).catch((error) => {
                console.log("Erreur de requête.")
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12} >
                        <Nav bsStyle="tabs">
                            {this.state.sensors.map((sensor) =>
                                <LinkContainer key={sensor._id} to={"/static/sensor/" + sensor._id}>
                                    <NavItem>{sensor._id}</NavItem>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Col>
                </Row>
                {this.props.children}
            </div>
        );
    }
}

export default App;
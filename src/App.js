import React from 'react';
import { Grid, Navbar, NavItem, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar staticTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">MQTT Displayer</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/websocket">
                            <NavItem eventKey={1}>Websocket</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/static">
                            <NavItem eventKey={2}>Static</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>

                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}
export default App;
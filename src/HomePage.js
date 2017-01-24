import React from 'react';
import { Row, Col } from "react-bootstrap"

class Homepage extends React.Component {

    render() {
        return (
            <Row>
                <Col md={12} >
                    <p>Mais oui mais oui, la maison est sur piloris.</p>
                </Col>
            </Row>
        );
    }
}

export default Homepage;
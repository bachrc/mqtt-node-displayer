import React from 'react';
import '../App.css';
import {Row, Col} from 'react-bootstrap'

class StaticApp extends React.Component {

    render() {
        return (
            <div>
                <Row>
                    <Col md={12} >
                        <p>C'est très statique tout ça.</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default StaticApp;
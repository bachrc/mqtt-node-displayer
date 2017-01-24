import React from 'react';
import SensorList from './components/SensorList';
import BrokerBar from './components/BrokerBar'
import brokerclient from './api/MqttClient';
import { addSensor, setConnected } from './Redux/actions'
import '../App.css';
import { connect } from "react-redux";
import { Row, Col, Jumbotron} from "react-bootstrap"

class AppWebsocket extends React.Component {
    constructor(props) {
        super(props);

        brokerclient.onMessage = props.updateSensor;
        brokerclient.onConnect = props.setConnected;
        brokerclient.onDisconnect = props.setDisconnected;
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <BrokerBar/>
                </Jumbotron>
                <Row>
                    <Col md={4} >
                        <SensorList/>
                    </Col>
                    <Col md={8}>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSensor: (topic, message) => {
            let received = JSON.parse(message);
            dispatch(
                addSensor({
                    name : topic.split("/")[1],
                    type : received.type,
                    value: received.value
                })
            )
        },
        setConnected: () => {
            dispatch(setConnected(true))
        },
        setDisconnected: () => {
            dispatch(setConnected(false))
        }
    }
};

export default connect(null, mapDispatchToProps)(AppWebsocket);
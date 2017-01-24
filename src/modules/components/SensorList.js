import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import {ListGroup, ListGroupItem, Badge} from 'react-bootstrap'
import '../../App.css';

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors
    }
};

class SensorList extends React.Component {
    render() {
        return (
            <ListGroup>
                {Object.keys(this.props.sensors).map(key =>
                    <LinkContainer to={"/websocket/sensor/" + key}>
                        <ListGroupItem key={key}>
                            {key}
                            <Badge pullRight={true}>
                                {this.props.sensors[key].length}
                            </Badge>
                        </ListGroupItem>
                    </LinkContainer>
                )}
            </ListGroup>
        );
    }
}

export default connect(mapStateToProps)(SensorList);
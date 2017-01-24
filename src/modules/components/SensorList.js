import React from 'react';
import {Link} from 'react-router'
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
                    <ListGroupItem key={key}>
                        <Link to={"/sensor/" + key}>
                            {key}
                            <Badge pullRight={true}>
                                {this.props.sensors[key].length}
                            </Badge>
                        </Link>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}

export default connect(mapStateToProps)(SensorList);
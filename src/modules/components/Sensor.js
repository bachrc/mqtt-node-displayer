import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
import Duration from 'duration-js';

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors
    }
};

class Sensor extends React.Component {
    constructor(props) {
        super(props);

        this.details = this.details.bind(this);
    }

    details() {
        let key = this.props.params.id;
        if(!(key in this.props.sensors)) {
            this.props.router.push('/');
        } else {
            let lastup = new Duration(Date.now() - this.props.sensors[key][0].date);
            return (
                <div>
                    <Grid>
                        <Row><h2>{key}</h2></Row>
                        <Row>
                            <Col md={2}>Valeur</Col><Col md={10}>{this.props.sensors[key][0].value}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Type</Col><Col md={10}>{this.props.sensors[key][0].type}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Dernière mise à jour</Col><Col md={10}>{lastup.toString()}</Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
    }

    render() {
        return (
            <Panel>
                {this.details()}
            </Panel>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Sensor))
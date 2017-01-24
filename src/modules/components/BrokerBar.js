import React from 'react';
import {connect} from 'react-redux'
import { changeBroker } from '../Redux/actions'
import {FormGroup, FormControl, ControlLabel, Button, Label} from 'react-bootstrap'

const mapStateToProps = (state) => {
    return {
        brokerValue: state.brokerAddress,
        brokerConnected: state.connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeBrokerValue: (url) => {
            dispatch(changeBroker(url));
        }
    }
};


class BrokerBar extends React.Component {
    constructor(props) {
        super(props);
        this.input = {
            value: props.brokerValue
        };

        this.statut = this.statut.bind(this);
    }

    statut() {
        if(this.props.brokerConnected)
            return (
                <Label bsStyle="success">Connecté</Label>
            );
        else
            return (
                <Label bsStyle="danger">Déconnecté</Label>
            );
    }

    render() {
        return (
            <div>
                <h1>MQTT Displayer v2</h1><br />
                <form onSubmit={e => {
                    e.preventDefault();
                    if (!this.input.value.trim()) {
                        return
                    }
                    this.props.changeBrokerValue(this.input.value);
                    this.input.value = '';
                }}>
                    <FormGroup controlId="brokerurl">
                        <ControlLabel>Adresse du broker</ControlLabel>
                        <FormControl
                            type="text"
                            inputRef={(node) => { this.input = node }} />
                    </FormGroup>
                    <Button type="submit">
                        Connect
                    </Button>

                </form>
                <br />
                <p>
                    <small>Statut : {this.statut()}</small>
                </p>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrokerBar)
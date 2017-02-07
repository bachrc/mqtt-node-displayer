import React from 'react';
import {Row, Col, Panel, FormGroup, FormControl, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import DateTimePicker from 'react-datetimepicker-bootstrap'

class Sensor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sensors : {},
            nameInputState : null,
            locationInputState : null,
            beginDate : null,
            endDate : null
        };

        this.nameInput = {
            value : "",
        };

        this.locationInput = {
            value : ""
        };

        this.getInfos = this.getInfos.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

        this.getInfos(this.props.params.id);
    }

    getInfos(key = this.props.params.id) {
        let myHeaders = new Headers();

        let url = "http://localhost:8008/v1/sensors/" + encodeURIComponent(key) + "?limit=10";
        if(this.state.beginDate)
            url += "&after=" + encodeURIComponent(this.state.beginDate);

        if(this.state.endDate)
            url += "&before=" + encodeURIComponent(this.state.endDate);

        console.log(url);

        fetch(url,
            {   method: 'GET',
                mode: 'cors',
                headers: myHeaders,
                cache: 'default'
            })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                let json = JSON.parse(response);

                if(json.sensor) {
                    // Traitement si nous avons reçu un sensor
                    this.nameInput.value = json.sensor.name || "";
                    this.locationInput.value = json.sensor.location || "";
                    this.setState({
                        sensors: {
                            [key]: json
                        },
                    });
                } else if (json.errorCode) {
                    // Traitement si erreur
                    console.log("Erreur : " + json.message)
                }

            }).catch((error) => {
                console.log("Erreur de requête : " + error)
        });
    }

    updateName(e) {
        e.preventDefault();

        let myHeaders = new Headers();

        fetch("http://localhost:8008/v1/sensors/" + encodeURIComponent(this.props.params.id) + "/modify?name=" + encodeURIComponent(this.nameInput.value),
            {   method: 'POST',
                mode: 'cors',
                headers: myHeaders,
                cache: 'default'
            })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                let json = JSON.parse(response);
                if(json.success) {
                    console.log("Bien maj.");
                    this.setState({nameInputState : "success"})
                } else {
                    this.setState({nameInputState : "error"})
                }
            }).catch((error) => {
                console.log("Erreur de requête : " + error)
                this.setState({nameInputState : "error"})
            });
    }

    updateLocation(e) {
        e.preventDefault();

        let myHeaders = new Headers();

        fetch("http://localhost:8008/v1/sensors/" + encodeURIComponent(this.props.params.id) + "/modify?location=" + encodeURIComponent(this.locationInput.value),
            {   method: 'POST',
                mode: 'cors',
                headers: myHeaders,
                cache: 'default'
            })
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                let json = JSON.parse(response);
                if(json.success) {
                    console.log("Bien maj.");
                    this.setState({locationInputState : "success"})
                } else {
                    this.setState({locationInputState : "error"})
                }
            }).catch((error) => {
            console.log("Erreur de requête : " + error)
            this.setState({locationInputState : "error"})
        });
    }

    // Fonction appelée lors d'un changement de capteur
    componentWillReceiveProps(nextProps) {
        this.setState({
            nameInputState : null,
            locationInputState : null,
            beginDate: null,
            endDate: null
        });
        document.getElementById("start").value = "";
        document.getElementById("end").value = "";
        this.getInfos(nextProps.params.id);
    }

    render() {
        let key = this.props.params.id;
        let sensorID = "", sensorName = "", sensorType = "", sensorLocation = "", measures = [];

        if(key in this.state.sensors) {
            sensorID = this.state.sensors[key].sensor._id || "";
            sensorName = this.state.sensors[key].sensor.name || "";
            sensorType = this.state.sensors[key].sensor.type || "";
            sensorLocation = this.state.sensors[key].sensor.location || "";
            measures = this.state.sensors[key].measures || []
        }

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Panel>
                            <Row>
                                <Col md={2}>
                                    <h5>ID Capteur</h5>
                                </Col>
                                <Col md={10}>
                                    {sensorID}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <h5>Type</h5>
                                </Col>
                                <Col md={10}>
                                    {sensorType}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <h5>Nom</h5>
                                </Col>
                                <Col md={10}>
                                    <form onSubmit={this.updateName}>
                                        <FormGroup validationState={this.state.nameInputState}>
                                            <FormControl type="text"
                                                         inputRef={(node) => {this.nameInput = node}}
                                                         defaultValue={sensorName} />
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <h5>Localisation</h5>
                                </Col>
                                <Col md={10}>
                                    <form onSubmit={this.updateLocation}>
                                        <FormGroup validationState={this.state.locationInputState}>
                                            <FormControl type="text"
                                                         inputRef={(node) => {this.locationInput = node}}
                                                         defaultValue={sensorLocation} />
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                            <Row>
                                <Panel collapsible header="Measures">
                                    <Row>
                                        <Col md={2}>
                                            <h5>Début</h5>
                                        </Col>
                                        <Col md={10}>
                                            <DateTimePicker id="start" getValue={(value) => {this.setState({beginDate:new Date(value)}); this.getInfos()}}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={2}>
                                            <h5>Fin</h5>
                                        </Col>
                                        <Col md={10}>
                                            <DateTimePicker id="end" getValue={(value) => {this.setState({endDate:new Date(value)}); this.getInfos()}} />
                                        </Col>
                                    </Row>
                                    <ListGroup fill>
                                        {measures.map((measure) => {
                                            return <ListGroupItem header={new Date(Date.parse(measure.date)).toLocaleString()}
                                                                  key={measure._id}>
                                                Valeur : {measure.value}
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>

                                </Panel>
                            </Row>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Sensor;
import React from 'react';
import { Row, Col, PageHeader } from "react-bootstrap"

class Homepage extends React.Component {

    render() {
        return (
            <Row>
                <Col md={12} >
                    <PageHeader>Page d'accueil du MQTT Displayer</PageHeader>
                    <p>
                        Bienvenue dans le MQTT Displayer. Vous pouvez naviguer sur les deux parties du site à l'aide
                        du menu ci-dessus.
                    </p>
                    <p>
                        Le menu Websocket vous mènera vers une page où vous renseignez l'adresse d'un broker MQTT, et les
                        valeurs sur value/# seront affichées automatiquement.
                    </p>
                    <p>
                        Le menu Static vous mènera vers une page interagissant avec une API interfaçant avec une base de
                        données Mongodb, metant à disposition les données des capteurs.
                    </p>
                </Col>
            </Row>
        );
    }
}

export default Homepage;
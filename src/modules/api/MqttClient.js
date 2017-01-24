let mqtt = require('mqtt');

class MqttClient {
    constructor() {
        this.client = null;
        this.onConnect = null;
        this.onMessage = null;
        this.onDisconnect = null;

        this.connect = this.connect.bind(this);
        this.setRefs = this.setRefs.bind(this);
    }

    setRefs(onConnect, onMessage, onDisconnect) {
        this.onConnect = onConnect;
        this.onMessage = onMessage;
        this.onDisconnect = onDisconnect;
    }

    connect(url) {
        if(this.client !== null)
            this.client.end();

        this.client = mqtt.connect("ws://" + url);

        if(this.onMessage != null)
            this.client.on("message", this.onMessage);


        if(this.onDisconnect != null)
            this.client.on("close", this.onDisconnect);

        if(this.onConnect != null)
            this.client.on("connect", this.onConnect);

        this.client.subscribe("value/#");
    }
}

let brokerclient = new MqttClient();

export default brokerclient;
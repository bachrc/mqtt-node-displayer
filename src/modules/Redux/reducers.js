import {ADD_SENSOR, CHANGE_BROKER, SET_CONNECTED} from "./actions";
import brokerclient from '../api/MqttClient';

/**
 * Created by Yohann Bacha on 06/01/2017.
 */

const defaultState = {
    brokerAddress : "192.168.99.100:8080",
    connected: false,
    sensors : [],
    maximumHistory : 30
};

function changeBroker(state, action) {
    brokerclient.connect(action.address);
    return Object.assign({}, state, {brokerAddress : action.address});
}

function insertOrUpdateSensors(state, action) {
    let sensorsTemp = Object.assign({}, state.sensors);

    if(!(action.name in sensorsTemp))
        sensorsTemp[action.name] = [];

    sensorsTemp[action.name].unshift({
        name : action.name,
        type : action.sensortype,
        value: action.value,
        date: Date.now()
    });

    while(sensorsTemp[action.name].length > state.maximumHistory)
        sensorsTemp[action.name].pop();

    console.log(sensorsTemp);

    return Object.assign({}, state, {sensors: sensorsTemp});
}

function changeConnectState(state, action) {
    if(typeof action.connected === "boolean")
        return Object.assign({}, state, {connected: action.connected});
    else
        return state;
}

function sensorsApp(state = defaultState, action) {
    switch (action.type) {
        case ADD_SENSOR:
            return insertOrUpdateSensors(state, action);
        case CHANGE_BROKER:
            return changeBroker(state, action);
        case SET_CONNECTED:
            return changeConnectState(state, action);
        default:
            return state;
    }
}

export default sensorsApp;
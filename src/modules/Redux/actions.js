
/** action types **/

export const ADD_SENSOR = 'ADD_SENSOR';
export const CHANGE_BROKER = 'CHANGE_BROKER';
export const SET_CONNECTED = 'SET_CONNECTED';

/** action creators **/

export function addSensor(sensor) {
    return {
        type : ADD_SENSOR,
        name : sensor.name,
        sensortype : sensor.type,
        value: sensor.value
    }
}

export function changeBroker(url) {
    return {
        type : CHANGE_BROKER,
        address : url
    }
}

export function setConnected(connected) {
    return {
        type : SET_CONNECTED,
        connected: connected
    }
}
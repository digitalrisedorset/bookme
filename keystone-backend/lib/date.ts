import {padL} from "./string";

export const getTime = (time: number) => {
    let hours = Math.floor(time);
    let minutes = Math.floor((time - hours ) * 60);

    let hour = hours.toString()
    if (hours.toString().length === 1) {
        hour = "0" + hours.toString();
    }

    let min = minutes.toString()
    if (minutes.toString().length === 1) {
        min = "0" + minutes.toString();
    }

    return hour + ":" + min;
}

export const getTimeFromMinutes = (time: number) => {
    let hours = Math.floor(time / 60);
    let minutes = Math.floor(time - hours * 60);

    let hour = hours.toString()
    if (hours.toString().length === 1) {
        hour = "0" + hours.toString();
    }

    let min = minutes.toString()
    if (minutes.toString().length === 1) {
        min = "0" + minutes.toString();
    }

    return hour + ":" + min;
}

export const getMinutes = (time: string) => {
    const info = time.split(':')
    const hour = parseInt(info[0]) | 0
    const min = parseInt(info[1]) | 0

    return hour + min * 60
}

const getDateWithoutTime = (date: Date) => {
    return date.toISOString().split('T')[0]
}

export const getTimeFromISO = (time: string) => {
    const date = new Date(time)
    let min = date.getMinutes().toString()
    if (min.length === 1) {
        min = "0" + min.toString();
    }

    let hour = date.getHours().toString()
    if (hour.length === 1) {
        hour = "0" + hour.toString();
    }
    return `${hour}:${min}`
}

export const getFormattedDate = (date: string) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dt = new Date(date);

    return `${dt.toLocaleDateString("en-GB", options)} at ${padL(dt.getHours())}:${padL(dt.getMinutes())}`
}

const parseISOString = (s: string) => {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export const isoFormatDMY = (d: string) => {
    const date = parseISOString(d); //new Date(d)
    return date
    function pad(n) {return (n<10? '0' :  '') + n}
    return pad(date.getUTCDate()) + '/' + pad(date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
}

export const concatDateTime = (dateDay, dateTime) => {
    return dateDay.concat('T', dateTime, ':00.101Z')
}

export const getHour = (time: string, defaultTime: number) => {
    if (time ===undefined) return defaultTime

    var b = time.split(/:/);
    return parseInt(b[0])
}
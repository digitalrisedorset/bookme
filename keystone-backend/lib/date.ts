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

    console.log('getTime', time, hour + ":" + min)
    return hour + ":" + min;
}
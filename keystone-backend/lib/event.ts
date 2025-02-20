import {getTimeFromISO} from "./date";

export const getEventEndTime = (duration: number, breakTime: number, startTime: string, shampoo: boolean, eventHostLevel: string): string => {
    let time = duration + breakTime

    switch (eventHostLevel) {
        case 'apprentice':
        case 'junior':
            break;
        case 'senior':
            time *= 1.2
            break;
    }

    if (shampoo === 1) {
        time += 10
    }

    //console.log('event duration final', {eventType, shampoo, event})
    const date = new Date(startTime)
    date.setMinutes (date.getMinutes() + time);

    console.log('duration', date.toISOString())
    return date.toISOString()
}
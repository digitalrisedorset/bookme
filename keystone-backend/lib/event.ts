import {getTimeFromISO} from "./date";

export const getEventEndTime = (duration: number, breakTime: number, startTime: string, shampoo: boolean, hairdresserLevel: string): string => {
    let time = duration + breakTime

    switch (hairdresserLevel) {
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

    //console.log('event duration final', {haircut, shampoo, event})
    const date = new Date(startTime)
    date.setMinutes (date.getMinutes() + time);

    console.log('duration', date.toISOString())
    return date.toISOString()
}
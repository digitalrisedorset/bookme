export const getDays = () => {
    const current = new Date()
    const week = [];
    // Starting Monday not Sunday
    const first = current.getDate() - current.getDay() + 1;
    current.setDate(first);
    for (var i = 0; i < 7; i++) {
        week.push({
            day: current.toLocaleString('en-GB', {  weekday: 'long' }).toLowerCase(),
            dayLabel: current.toLocaleString('en-GB', {  weekday: 'long' })
        });
        current.setDate(current.getDate()+1);
    }

    return week;
}

export const getTime = (time: string) => {
    const date = new Date(time)
    let min = date.getMinutes()
    if (min < 10) {
        min = "0" + min;
    }
    return `${date.getHours()}:${min}`
}

export const getDate = (time: string) => {
    const date = new Date(time)
    return date.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric"})
}

import {WeekDay} from "../types";

export class DateFinder {
    private weekDays: WeekDay[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    /*
    eg: 2025-12-17T07:54:37.760Z
     */
    getDateWithoutTime = (date: Date) => {
        return date.toISOString().split('T')[0]
    }

    getDatesByDay = (day: WeekDay, year: number): string[] => {
        let date = new Date()
        let dateDay = date.getDay()

        // find all dates that fall on the day value
        const result = []
        if (date.getFullYear() === year && this.weekDays[dateDay]!== undefined && this.weekDays[dateDay] === day) {
            result.push(this.getDateWithoutTime(date))
        }

        for (let i=0;i<500;i++) {
            date.setDate(date.getDate() + 1);
            dateDay = date.getDay()
            //console.log(`year date year sought: ${year}, date year: ${date.getFullYear()}`, date.toISOString())
            if (date.getFullYear() === year && this.weekDays[dateDay]!== undefined && this.weekDays[dateDay] === day) {
                result.push(this.getDateWithoutTime(date))
            }
        }

        //console.log(`get days ${day}`, result)
        return result
    }
}
import {Venue} from "@/pages/venue/styles/Venue";
import {Label} from "@/pages/global/styles/Form";
import {getDays} from "@/lib/date";

export const DayFilter: React.FC = () => {

    const onDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
    };

    return (
        <Venue>
            <fieldset>
                <Label>Week Day</Label>
                <select onChange={onDayChange} className="form-select">
                    <option value="">-</option>
                    {getDays().map((item) => {
                        return (<option key={item.day} value={item.day}>{item.dayLabel}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}
import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {getDays} from "@/lib/date";

export const DayFilter: React.FC = () => {

    const onDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Week Day</Label>
                <select onChange={onDayChange} className="form-select">
                    <option value="">-</option>
                    {getDays().map((item) => {
                        return (<option key={item.day} value={item.day}>{item.dayLabel}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}
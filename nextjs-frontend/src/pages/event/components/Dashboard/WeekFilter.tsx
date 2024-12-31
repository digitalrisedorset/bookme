import {Venue} from "@/pages/venue/styles/Venue";
import {Label} from "@/pages/global/styles/Form";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {getWeeks} from "@/lib/date";

export const WeekFilter: React.FC = () => {
    const {eventFilter, setActiveWeek} = useEventFilterState()

    const onWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveWeek(e.target.value)
    };

    return (
        <Venue>
            <fieldset>
                <Label>Week Filter</Label>
                <select onChange={onWeekChange} className="form-select" value={eventFilter.activeWeek}>
                    <option value="">-</option>
                    {getWeeks().map((item) => {
                        return (<option key={item.weekStart} value={item.weekStart}>{item.weekLabel}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}
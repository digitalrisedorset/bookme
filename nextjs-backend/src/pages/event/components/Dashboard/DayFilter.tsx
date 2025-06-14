import {Label} from "@/pages/global/styles/Form";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {getDays} from "@/lib/date";
import {Fieldset} from "@/pages/global/styles/Fieldset";

export const DayFilter: React.FC = () => {
    const {setActiveDay} = useEventFilterState()

    const onDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveDay(e.target.value)
    };

    return (
        <Fieldset>
            <fieldset>
                <Label>Week Day</Label>
                <select onChange={onDayChange} className="form-select">
                    <option value="">-</option>
                    {getDays().map((item) => {
                        return (<option key={item.day} value={item.day}>{item.dayLabel}</option>)
                    })}
                </select>
            </fieldset>
        </Fieldset>
    )
}
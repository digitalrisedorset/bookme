import {Venue} from "@/pages/venue/styles/Venue";
import {Label} from "@/pages/global/styles/Form";
import {useEventTypes} from "@/pages/event/hooks/useEventTypes";
import {useEventFilterState} from "@/state/EventFilterProvider";

export const EventTypeFilter: React.FC = () => {
    const {data} = useEventTypes()
    const {setActiveEventType} = useEventFilterState()

    const onEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveEventType(e.target.value)
    };

    return (
        <Venue>
            <fieldset>
                <Label>Event type</Label>
                <select onChange={onEventTypeChange} className="form-select">
                    <option value="">-</option>
                    {data?.eventTypes.map((item) => {
                        return (<option key={item.name} value={item.name}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}
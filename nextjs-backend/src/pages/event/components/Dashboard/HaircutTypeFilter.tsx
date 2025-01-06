import {Label} from "@/pages/global/styles/Form";
import {useHaircutTypes} from "@/pages/event/hooks/useHaircutTypes";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {Fieldset} from "@/pages/global/styles/Fieldset";

export const HaircutTypeFilter: React.FC = () => {
    const {data} = useHaircutTypes()
    const {eventFilter, setActiveHaircutType} = useEventFilterState()

    const onHaircutTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveHaircutType(e.target.value)
    };

    return (
        <Fieldset>
            <fieldset>
                <Label>Haircut type</Label>
                <select onChange={onHaircutTypeChange} className="form-select" value={eventFilter.activeHaircutType}>
                    <option value="">-</option>
                    {data?.haircutTypes.map((item) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Fieldset>
    )
}
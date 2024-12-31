import {Venue} from "@/pages/venue/styles/Venue";
import {Label} from "@/pages/global/styles/Form";
import {useHaircutTypes} from "@/pages/event/hooks/useHaircutTypes";
import {useEventFilterState} from "@/state/EventFilterProvider";

export const HaircutTypeFilter: React.FC = () => {
    const {data} = useHaircutTypes()
    const {setActiveHaircutType} = useEventFilterState()

    const onHaircutTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveHaircutType(e.target.value)
    };

    return (
        <Venue>
            <fieldset>
                <Label>Haircut type</Label>
                <select onChange={onHaircutTypeChange} className="form-select">
                    <option value="">-</option>
                    {data?.haircutTypes.map((item) => {
                        return (<option key={item.name} value={item.name}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}
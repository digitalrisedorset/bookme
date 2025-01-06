import {Label} from "@/pages/global/styles/Form";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import {Hairdresser} from "@/pages/hairdresser/styles/Hairdresser";
import {capitalise} from "@/lib/string";

export const HairdresserFilter: React.FC = () => {
    const {data} = useHairdressers()
    const {eventFilter, setActiveHairdresser} = useEventFilterState()

    const onHairdresserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveHairdresser(e.target.value)
    };

    return (
        <Hairdresser>
            <fieldset>
                <Label>Hairdresser Filter</Label>
                <select onChange={onHairdresserChange} className="form-select" value={eventFilter.activeHairdresser}>
                    <option value="">-</option>
                    {data?.hairdressers.map((item) => {
                        return (<option key={item.id} value={item.id}>{capitalise(item.name)}</option>)
                    })}
                </select>
            </fieldset>
        </Hairdresser>
    )
}
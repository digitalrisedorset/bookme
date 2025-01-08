import {useEvents} from "@/components/venue/hooks/useVenues";
import {Label} from "@/components/global/styles/Form";
import {Venue} from "@/components/venue/styles/Venue";

export const VenueFilter: React.FC = () => {
    const {data} = useEvents()

    const onVenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
    };

    return (
        <Venue>
            <fieldset>
                <Label>Venue Filter</Label>
                <select onChange={onVenueChange} className="form-select">
                    <option value="">-</option>
                    {data?.venues.map((item) => {
                        return (<option key={item.name} value={item.name}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}
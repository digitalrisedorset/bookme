import {Label} from "@/components/global/styles/Form";
import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {useVenues} from "@/components/venue/hooks/useVenues";
import {Venue} from "@/components/venue/types/venue";

export const VenueFilter: React.FC = () => {
    const {data} = useVenues()

    const onVenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Venue Filter</Label>
                <select onChange={onVenueChange} className="form-select">
                    <option value="">-</option>
                    {data?.venues.map((item: Venue) => {
                        return (<option key={item.name} value={item.name}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}
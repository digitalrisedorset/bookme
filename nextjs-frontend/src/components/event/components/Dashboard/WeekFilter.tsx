import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {getWeeks} from "@/lib/date";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {WeeksType} from "@/components/event/types/event";
import {useUserPreferenceState} from "@/state/UserPreference";

export const WeekFilter: React.FC = () => {
    const {userPreference, setWeekPreference} = useUserPreferenceState()
    const config = useConfig()

    const onWeekChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWeekPreference(e.target.value)
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Week Filter</Label>
                <select onChange={onWeekChange} className="form-select" value={userPreference.weekPreference}>
                    <option value="">-</option>
                    {getWeeks(config.scheduleWeekSpan).map((item: WeeksType) => {
                        return (<option key={item.weekStart} value={item.weekStart}>{item.weekLabel}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}
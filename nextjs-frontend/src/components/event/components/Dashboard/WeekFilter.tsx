import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {getWeeks} from "@/lib/date";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {WeeksType} from "@/components/event/types/event";

export const WeekFilter: React.FC = () => {
    const user = useUser()
    const config = useConfig()
    const [updateUserPreference] = useWeekPreference()

    if (user?.id === undefined) return
    const onWeekChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id,{'weekPreference': e.target.value})
        })
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Week Filter</Label>
                <select onChange={onWeekChange} className="form-select" value={user.weekPreference}>
                    <option value="">-</option>
                    {getWeeks(config.scheduleWeekSpan).map((item: WeeksType) => {
                        return (<option key={item.weekStart} value={item.weekStart}>{item.weekLabel}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}
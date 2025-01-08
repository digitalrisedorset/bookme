import {Venue} from "@/components/venue/styles/Venue";
import {Label} from "@/components/global/styles/Form";
import {getWeeks} from "@/lib/date";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {usePreferenceVariables} from "@/components/user-authentication/hooks/usePreference";

export const WeekFilter: React.FC = () => {
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()
    const onWeekChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id,{'weekPreference': e.target.value})
        })
    };

    return (
        <Venue>
            <fieldset>
                <Label>Week Filter</Label>
                <select onChange={onWeekChange} className="form-select" value={user?.weekPreference}>
                    <option value="">-</option>
                    {getWeeks().map((item) => {
                        return (<option key={item.weekStart} value={item.weekStart}>{item.weekLabel}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}
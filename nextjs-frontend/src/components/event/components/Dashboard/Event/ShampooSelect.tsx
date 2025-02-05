import React from "react";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {OPTION_SELECTED} from "@/components/event/types/event";
import {Radio} from "@/components/global/components/Preference/Radio";


export const ShampooSelect: React.FC = () => {
    const {eventState,toggleShampooEvent} = useEventState()

    const handleSelect = () => {
        toggleShampooEvent()
    }

    const getSelectedStatus = (shampoo: boolean) => {
        return (shampoo === true)?OPTION_SELECTED: ''
    }

    return <SelectStyle>
        <Radio selected={getSelectedStatus(eventState.shampoo)}
               id="shampoo_yes"
               name="shampoo"
               value="true"
               checked={eventState.shampoo === true}
               onChange={handleSelect}
               label="Yes"
        />
        <Radio selected={getSelectedStatus(eventState.shampoo)}
               id="shampoo_no"
               name="shampoo"
               value="false"
               checked={eventState.shampoo === false}
               onChange={handleSelect}
               label="No"
        />
    </SelectStyle>
}
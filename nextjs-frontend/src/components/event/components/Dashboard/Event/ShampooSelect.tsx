import React from "react";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {Radio} from "@/components/global/components/Preference/Radio";


export const ShampooSelect: React.FC = () => {
    const {eventState,toggleShampooEvent} = useEventState()

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('shampoo selected', e.target.value)
        toggleShampooEvent()
    }

    return <SelectStyle>
        <Radio id="shampoo_yes"
               name="shampoo"
               value="true"
               checked={eventState.shampoo === true}
               onChange={handleSelect}
               label="Yes"
        />
        <Radio id="shampoo_no"
               name="shampoo"
               value="false"
               checked={eventState.shampoo === false}
               onChange={handleSelect}
               label="No"
        />
    </SelectStyle>
}
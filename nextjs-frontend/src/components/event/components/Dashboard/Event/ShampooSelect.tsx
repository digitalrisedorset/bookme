import React from "react";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";


export const ShampooSelect: React.FC = () => {
    const {eventState,toggleShampooEvent} = useEventState()

    const handleSelect = () => {
        //e.preventDefault();
        toggleShampooEvent()
    }

    return <SelectStyle>
            <div>
                <input type="radio" id="shampoo_yes" name="shampoo" value="true" checked={eventState.shampoo === true} onChange={handleSelect} />
                <label htmlFor="shampoo">Yes</label>
            </div>
            <div>
                <input type="radio" id="shampoo_no" name="shampoo" value="false" checked={eventState.shampoo === false} onChange={handleSelect} />
                <label htmlFor="shampoo">No</label>
            </div>
    </SelectStyle>
}
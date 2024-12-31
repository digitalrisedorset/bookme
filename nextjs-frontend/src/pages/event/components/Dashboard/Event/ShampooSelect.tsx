import React from "react";
import {SelectStyle} from "@/pages/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";


export const ShampooSelect: React.FC = () => {
    const {shampoo,toggleShampooEvent} = useEventState()

    const handleSelect = (e: React.FormEvent) => {
        //e.preventDefault();
        toggleShampooEvent(e.target.value)
    }

    return <SelectStyle>
            <div>
                <input type="radio" id="shampoo_yes" name="shampoo" value="true" checked={shampoo === true} onChange={handleSelect} />
                <label htmlFor="shampoo">Yes</label>
            </div>
            <div>
                <input type="radio" id="shampoo_no" name="shampoo" value="false" checked={shampoo === false} onChange={handleSelect} />
                <label htmlFor="shampoo">No</label>
            </div>
    </SelectStyle>
}
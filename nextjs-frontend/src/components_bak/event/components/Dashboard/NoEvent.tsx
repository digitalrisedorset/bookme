import React from "react";
import {EmptyListingStyles} from "@/components/event/styles/EventFilterStyles";

export const NoEvent: React.FC = () => {
    return (
        <EmptyListingStyles>
            <h1>No Events were found matching your criterias</h1>
        </EmptyListingStyles>
    )
}
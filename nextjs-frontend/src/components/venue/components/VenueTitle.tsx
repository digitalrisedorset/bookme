import React from "react";
import {useVenue} from "@/components/venue/hooks/useVenue";

const VenueTitle: React.FC = () => {
    const venue = useVenue()

    return (
        <>{venue &&<p className="venue-title">{venue.name}</p>}</>
    )
}

export default VenueTitle
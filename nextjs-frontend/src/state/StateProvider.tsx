import {CartStateProvider} from "@/state/CartState";
import {EventStateProvider} from "@/state/EventState";
import {VenueConfigStateProvider} from "@/state/VenueConfigState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <EventStateProvider>
                <CartStateProvider>
                    <VenueConfigStateProvider>
                    {children}
                    </VenueConfigStateProvider>
                </CartStateProvider>
            </EventStateProvider>;
}
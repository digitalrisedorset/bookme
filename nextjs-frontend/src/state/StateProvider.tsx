import {CartStateProvider} from "@/state/CartState";
import {EventStateProvider} from "@/state/EventState";
import {VenueConfigStateProvider} from "@/state/VenueConfigState";
import {FlashMessageProvider} from "@/state/FlassMessageState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <EventStateProvider>
                <CartStateProvider>
                    <FlashMessageProvider>
                        <VenueConfigStateProvider>
                        {children}
                        </VenueConfigStateProvider>
                    </FlashMessageProvider>
                </CartStateProvider>
            </EventStateProvider>;
}
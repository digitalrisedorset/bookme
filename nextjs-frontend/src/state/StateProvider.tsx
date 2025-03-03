import {CartStateProvider} from "@/state/CartState";
import {EventStateProvider} from "@/state/EventState";
import {VenueConfigStateProvider} from "@/state/VenueConfigState";
import {FlashMessageProvider} from "@/state/FlassMessageState";
import {UserPreferenceStateProvider} from "@/state/UserPreference";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <UserPreferenceStateProvider>
            <EventStateProvider>
                <CartStateProvider>
                    <FlashMessageProvider>
                        <VenueConfigStateProvider>
                        {children}
                        </VenueConfigStateProvider>
                    </FlashMessageProvider>
                </CartStateProvider>
            </EventStateProvider>
    </UserPreferenceStateProvider>;
}
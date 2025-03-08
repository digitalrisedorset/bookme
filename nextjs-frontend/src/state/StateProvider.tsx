import {CartStateProvider} from "@/state/CartState";
import {VenueConfigStateProvider} from "@/state/VenueConfigState";
import {FlashMessageProvider} from "@/state/FlassMessageState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <CartStateProvider>
                <FlashMessageProvider>
                    <VenueConfigStateProvider>
                    {children}
                    </VenueConfigStateProvider>
                </FlashMessageProvider>
            </CartStateProvider>;
}
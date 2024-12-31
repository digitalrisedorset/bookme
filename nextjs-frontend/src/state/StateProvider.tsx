import {CartStateProvider} from "@/state/CartState";
import {EventFilterProvider} from "@/state/EventFilterProvider";
import {EventStateProvider} from "@/state/EventState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <EventFilterProvider>
            <EventStateProvider>
                <CartStateProvider>
                    {children}
                </CartStateProvider>
            </EventStateProvider>
        </EventFilterProvider>;
}
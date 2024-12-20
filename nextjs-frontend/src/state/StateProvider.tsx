import {CartStateProvider} from "@/state/CartState";
import {EventFilterProvider} from "@/state/EventFilterProvider";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <EventFilterProvider>
            <CartStateProvider>
                    {children}
            </CartStateProvider>
        </EventFilterProvider>;
}
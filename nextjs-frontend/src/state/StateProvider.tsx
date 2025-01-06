import {CartStateProvider} from "@/state/CartState";
import {EventStateProvider} from "@/state/EventState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <EventStateProvider>
                <CartStateProvider>
                    {children}
                </CartStateProvider>
            </EventStateProvider>;
}
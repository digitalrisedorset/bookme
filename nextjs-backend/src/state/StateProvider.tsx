import {EventFilterProvider} from "@/state/EventFilterProvider";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return <EventFilterProvider>
            {children}
        </EventFilterProvider>;
}
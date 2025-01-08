import {AnimationStyles, Dot} from "@/components/event/styles/CartStyles";

interface CartHeadrProps {
    count: number
}

export const CartCount: React.FC<CartHeadrProps> = ({ count }: CartHeadrProps) => {
    return (
        <AnimationStyles>
            <Dot>{count}</Dot>
        </AnimationStyles>
    );
}
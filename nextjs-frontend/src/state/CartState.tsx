import {createContext, ReactNode, useContext} from 'react';
import {useImmer} from "use-immer";

interface CartInfoState {
    cartOpen: boolean,
    cartCount: number
}

interface CartState {
    cartState: CartInfoState,
    toggleCart: () => void,
    closeCart: () => void,
    setCount: (count: number) => void }

const initialState: CartInfoState = {
    cartOpen: false,
    cartCount: 0
}

const LocalStateContext = createContext<CartState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface CartStateProviderProps {
    children: ReactNode;
}

const CartStateProvider: React.FC<CartStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<CartInfoState>(initialState);

    function toggleCart() {
        setState(draft => { draft.cartOpen = !draft.cartOpen });
    }

    const setCount = (count: number) => {
        setState(draft => { draft.cartCount = count });
    }

    function closeCart() {
        setState(draft => { draft.cartOpen = false });
    }

    return <LocalStateProvider value={{
        cartState: state,
        toggleCart,
        closeCart,
        setCount
    }}>{children}</LocalStateProvider>
}

function useCart(): CartState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("useCart must be used within a LocalStateProvider");
    }
    return context;
}

export { CartStateProvider, useCart }
import { createContext, useContext, useState } from 'react';

interface CartState {
    cartOpen: boolean,
    toggleCart: () => void,
    closeCart: () => void,
    cartCount: number,
    setCount: (count: number) => void }

const LocalStateContext = createContext<CartState>({});
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
    // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

    const [ cartOpen, setCartOpen] = useState(false)
    const [ cartCount, setCartCount] = useState(0)

    function toggleCart() {
        setCartOpen(!cartOpen)
    }

    const setCount = (count: number) => {
        setCartCount(count)
    }

    function closeCart() {
        setCartOpen(false)
    }

    return <LocalStateProvider value={{ cartOpen, toggleCart, closeCart, cartCount, setCount }}>{children}</LocalStateProvider>
}

function useCart(): CartState {
    const all = useContext(LocalStateContext)
    return all
}

export { CartStateProvider, useCart }
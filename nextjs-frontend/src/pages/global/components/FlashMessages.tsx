import { useTypedSelector } from "../hooks/useTypedSelector";
import { SuccessStyles, ErrorStyles, AnimationStyles} from "../styles/FlashMessage"
import {useEffect, useRef, useState} from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MINUTE_MS = 5000;

export const FlashMessages: React.FC = () => {
    const { messages, messageType} = useTypedSelector((state) => state.flashMessages)
    const [hidden, setHidden] = useState<boolean>(false)

    const flashNodeRef = useRef(null)

    useEffect(() => {
        setHidden(false)
        const interval = setInterval(async () => {
            setHidden(true)
        }, MINUTE_MS);

        return () => clearInterval(interval)
    }, [messages])

    return (
        <>
            {!hidden && <AnimationStyles>
                <TransitionGroup>
                    <CSSTransition
                        in={hidden}
                        nodeRef={flashNodeRef}
                        timeout={MINUTE_MS}
                        classNames="display"
                        unmountOnExit
                        appear
                    >
                        <>
                            {messageType === 'error' && messages.map((msg, index) => {
                                return (
                                    <ErrorStyles>
                                        <div className="alert alert-error text-center floating-alert shadow-sm">
                                            {msg}
                                        </div>
                                    </ErrorStyles>
                                )
                            })}

                            {messageType === 'success' && messages.map((msg, index) => {
                                return (
                                    <SuccessStyles>
                                        <div className="alert alert-success text-center floating-alert shadow-sm">
                                            {msg}
                                        </div>
                                    </SuccessStyles>
                                )
                            })}
                        </>
                    </CSSTransition>
                </TransitionGroup>
            </AnimationStyles>}
        </>
    )
}

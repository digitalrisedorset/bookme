import styled from "styled-components";

export const ChangeButtonStyle = styled.button`
    font-size: 1rem;
    background-color: var(--black);
    border: none;
    cursor: pointer;
    color: white;
    padding: 5px;
    border-radius: 3px;
    margin: 0 10px;
`

export const ChangeEventStyle = styled.div`

`

export const ResetPrefence = styled.div`
    font-size: 1.5rem;
    button,
    input[type='submit'] {
        width: auto;
        background: var(--mediumgrey);
        color: white;
        border: 0;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;
    }
    @media (max-width: 600px) {
        fieldset {
            p {
                height: 0;
            }
        }
    }
`

export const PreferenceSummaryStyle = styled.h4`
    margin: 1rem 0;
    background: var(--grey);
    color: white;
    padding: 10px;
    strong {
        color: white;
        font-weight: bold;
    };
`
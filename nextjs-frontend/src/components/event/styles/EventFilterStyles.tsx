import styled from "styled-components";
import {EventStatus, OPTION_SELECTED} from "@/components/event/types/event";

export const EventFilterStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-gap: 1rem;
    
    div p {
        font-size: 1.2rem;
       height: 60px;
    }
    fieldset label {

    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        div p {
            font-size: 1.2rem;
            height: 30px;
        }
    }
`;

export const ListHeader = styled.section`
    grid-row: 2;
    width: 100%;
    padding: 20px 40px 0;

    @media (max-width: 600px) {
        padding: 20px 10px 0;
    }
`

export const EmptyListingStyles = styled.div`
    grid-column: 1 / -1;
    grid-row: 1;
    width: 100%;
    padding: 20px 20px 0;
    h1 {
        color: var(--red);  
        font-weight: bold;
        font-size: 1.8rem;
    }
`

export const NoWorkingDayStyles = styled.div`
    transform: skew(-30deg) rotate(-100deg);
    background: var(--grey);
    font-size: 1rem;
    color: white;
    width: 200px;
    top: 150px;
    left: 0px;
    position: absolute;

    @media (max-width: 600px) {
        transform: skew(-30deg) rotate(0deg);
        background: var(--grey);
        font-size: 1rem;
        color: white;
        width: 200px;
        top: 0px;
        left: 0px;
        position: relative;
    }
`

interface PreferenceProps {
    selected?: 'yes' | 'no'
}

export const PreferenceChoice = styled.div<PreferenceProps>`
    /*border: 1px solid var(--mediumgrey);*/
    border: ${(props) => props.selected === OPTION_SELECTED && `1px solid var(--red);`};
    background: var(--lightgrey);
    margin: 5px 0;
    padding: 5px;
    input {
        visibility: hidden;
    }
`
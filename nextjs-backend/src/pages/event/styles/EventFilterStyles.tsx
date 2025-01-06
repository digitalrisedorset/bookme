import styled from "styled-components";

export const EventFilterStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
    
    div p {
        font-size: 1.2rem;
       height: 60px;
    }
    fieldset label {

    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const ListHeader = styled.section`
    grid-row: 2;
    width: 100%;
    padding: 20px 40px 0;
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
`
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
`;

export const ListHeader = styled.div`
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
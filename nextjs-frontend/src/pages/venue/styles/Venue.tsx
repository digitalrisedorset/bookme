import styled, {keyframes} from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

export const Venue = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    select,
        textarea,
        select {
        width: 100%;
        padding: 0.5rem;
        font-size: 1.2rem;
        border: 1px solid black;
    }
    button,
        input[type='submit'] {
        width: auto;
        background: red;
        color: white;
        border: 0;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;
    }
`;
